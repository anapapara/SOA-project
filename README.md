# **Real-time Chat App**

🚀 This a real-time messaging application built with **React, Node.js, WebSockets, and RabbitMQ/Kafka** for instant and seamless communication.

## **🔹 Features**
* **Real-time messaging** with WebSocket  
* **User authentication** (JWT-based)  
* **Message status indicators** (Delivered, Seen)  
* **Unread message counts**  
* **Automatic WebSocket reconnection**  
* **Scalable architecture with RabbitMQ/Kafka**  

---

## **Tech Stack**
### **Frontend (React)**
- React + Hooks
- Axios for API requests
- WebSockets for real-time communication
- CSS for styling  

### **Backend (Node.js)**
- Express.js (REST API)
- WebSocket (ws) for real-time messaging
- MongoDB (Mongoose) for data storage
- RabbitMQ/Kafka for message queuing
- JWT for authentication  

---

## **Installation & Setup**

### **Prerequisites**
- **Node.js** (v16+)
- **MongoDB** (local or Atlas)
- **RabbitMQ or Kafka** (for message queuing)
- **Redis** (for WebSocket sessions)


 ## **API Endpoints**
 
|Method	| Endpoint	             | Description             | 
|-------|-----------------------|-------------------------|
|POST  	| /api/auth/register	   | Register a new user     | 
|POST  	| /api/auth/login	      | Login and get JWT token | 
|GET	   | /api/auth/users	      | Get all users           |  
|GET	   | /api/messages/:userId | Fetch messages by user  | 
|POST	  | /api/messages/send    | Send a new message      | 
