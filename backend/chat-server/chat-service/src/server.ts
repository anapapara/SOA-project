import { Server } from "http";
import { WebSocketServer } from 'ws';
import app from "./app";
import { connectDB } from "./database";
import config from "./config/config";
// import { kafkaService } from "./services/KafkaService";

let server: Server;
connectDB();
// kafkaService.startConsuming();

server = app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);