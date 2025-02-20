import WebSocket from 'ws';
import amqp, { Channel } from "amqplib";
import config from "../config/config";
import { UserStatusStore } from "../utils";

export class RabbitMQService {
    private channel!: Channel;
    private userStatusStore = new UserStatusStore();
    private ws: WebSocket;


    constructor(ws: WebSocket) {
        this.init();
        this.ws = ws;
    }

    async init() {
        const connection = await amqp.connect(config.msgBrokerURL!);
        this.channel = await connection.createChannel();
        await this.consumeNotification();
        await this.consumeNotificationOnMessages();
        await this.consumeNotificationOnStatus();
    }

    //read message from rabbitmq queue
    async consumeNotification() {
        await this.channel.assertQueue(config.queue.notifications);
        this.channel.consume(config.queue.notifications, async (msg) => {
            if (msg) {
                const {
                    type,
                    receiverId,
                    senderId,
                    receiverEmail,
                    senderEmail,
                    message,
                    senderName,
                    receiverName
                } = JSON.parse(msg.content.toString());

                if (type === "MESSAGE_RECEIVED") {
                    const isUserOnline = this.userStatusStore.isUserOnline(receiverId);
                    // console.log("---amqp:NOTIFICATION:  new message.");

                    if (!(this.ws?.readyState === WebSocket.OPEN)) {
                        this.ws = new WebSocket("ws://gateway:8080");
                    }
                    else {
                        this.ws.send(JSON.stringify({
                            type: "NOTIFY",
                            receiverId: receiverId,
                            receiverEmail: receiverEmail,
                            senderEmail: senderEmail,
                            senderId: senderId,
                            message: message,
                            senderName: senderName,
                            receiverName: receiverName,
                        }));
                        console.log(`Sent NOTIFY on WebSocket to ${receiverEmail}`);
                    }
                }

                this.channel.ack(msg); // Acknowledge the message after processing
            }
        });
    }
    async consumeNotificationOnMessages() {
        await this.channel.assertQueue(config.queue.messages);
        this.channel.consume(config.queue.messages, async (msg) => {
            if (msg) {
                console.log("received message on message queue")
                const data = JSON.parse(msg.content.toString());

                if (data.type === "SEEN_MESSAGES") {
                    // console.log("---amqp:MESSAGES:  seen message.");
                    const { type, receiverId, senderId, senderEmail } = JSON.parse(msg.content.toString());
                    if (!(this.ws?.readyState === WebSocket.OPEN)) {
                        this.ws = new WebSocket("ws://gateway:8080");
                    }
                    else {
                        this.ws.send(JSON.stringify({
                            type: "SEEN_MESSAGES", receiverId: receiverId, senderId: senderId, senderEmail: senderEmail
                        }));
                        console.log(`Sent SEEN_MESSAGES on WebSocket`);
                    }
                }
                else if (data.type === "DELIVERED_MESSAGES") {
                    // console.log("---amqp:MESSAGES:  delivered message.");
                    const { type, receiverId, senders } = JSON.parse(msg.content.toString());
                    if (!(this.ws?.readyState === WebSocket.OPEN)) {
                        this.ws = new WebSocket("ws://gateway:8080");
                    }
                    else {
                        this.ws.send(JSON.stringify({
                            type: "DELIVERED_MESSAGES", receiverId: receiverId, senders
                        }));
                        console.log(`Sent DELIVERED_MESSAGES on WebSocket`);
                    }
                }

                this.channel.ack(msg); // Acknowledge the message after processing
            }
        });
    }

    async consumeNotificationOnStatus() {
        await this.channel.assertQueue(config.queue.statuses_notif);
        this.channel.consume(config.queue.statuses_notif, async (msg) => {
            if (msg) {
                console.log("received message on status queue")
                const event = JSON.parse(msg.content.toString());

                if (event.eventType === "USER_LOGGED_IN") {
                    this.userStatusStore.setUserOnline(event.userId);
                    // console.log(`User ${event.userId} is now online in Notification Service.`);

                } else if (event.eventType === "USER_LOGGED_OUT") {
                    this.userStatusStore.setUserOffline(event.userId);
                    // console.log(`User ${event.userId} is now offline in Notification Service.`);
                }



                this.channel.ack(msg); // Acknowledge the message after processing
            }
        });
    }
}
