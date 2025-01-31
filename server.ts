import { createServer } from "node:http";
import next from "next";
import { Server, Socket } from "socket.io";
import { connectToDatabase } from "./lib/mongoose.js";
import Redis from "ioredis";
import { updateLastMessage } from "./lib/actions/conversation.action.js";
import Conversation from "./database/conversation.model.js";

const dev: boolean = process.env.NODE_ENV !== "production";
const hostname: string = "localhost";
const port: number = 3000;

// Types for messages
interface ChatMessage {
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
}

// Initialize Next.js application
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

//MongoDb connection
// connectToDatabase();

const redisURL =
  process.env.REDIS_COULD === "true"
    ? process.env.REDIS_URL
    : "redis://localhost:6379";

const redis = new Redis(redisURL); // General Redis connection
const pub = new Redis(redisURL); // Redis publisher
const sub = new Redis(redisURL); // Redis subscriber

// Store active users and their socket IDs
const users = new Map<string, string>();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  // Initialize Socket.IO server with CORS configuration
  const io = new Server(httpServer, {
    path: "/api/socket",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  sub.subscribe("new_message", (err) => {
    if (err) console.error("Redis subscription error:", err);
  });

  sub.on("message", async (channel, message) => {
    if (channel === "new_message") {
      const parsedMessage = JSON.parse(message);
      io.to(parsedMessage.conversationId).emit("newMessage", parsedMessage);
    }
  });

  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    socket.on("register", async (userId: string) => {
      users.set(userId, socket.id);
      await redis.hset("active_users", userId, socket.id);
      console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
      console.log(`Users map: `, users);
    });

    // Handle user joining a conversation
    socket.on("joinConversation", (conversationId: string) => {
      socket.join(conversationId);
      console.log(`User joined conversation: ${conversationId}`);
    });

    // Handle sending messages
    socket.on(
      "sendMessage",
      async (message: ChatMessage, callback: Function) => {
        const enrichedMessage = { ...message, timestamp: new Date() };

        const messageKey = `conversation:${message.conversationId}`;
        await redis.rpush(messageKey, JSON.stringify(enrichedMessage));

        // Publish message to Redis
        await pub.publish("new_message", JSON.stringify(enrichedMessage));

        // await Conversation.findByIdAndUpdate(message.conversationId, {
        //   lastMessage: {
        //     text: message.text,
        //     timestamp: new Date(),
        //   },
        //   $inc: { unreadCount: 1 },
        // });
        callback({ status: "ok", messageId: Date.now(), enrichedMessage });
      }
    );

    // Handle user disconnection
    socket.on("disconnect", async() => {
      console.log("User disconnected:", socket.id);

      // Find and remove the user from the active users map
      let disconnectedUser: string | undefined;
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          disconnectedUser = userId;
          users.delete(userId);
          await redis.hdel("active_users", userId)

          const keys = await redis.keys("conversation:*");
          keys.map(async (key, index) => {
            console.log("Keys: ", key)
            const messages = await redis.lrange(key, 0, -1);
            console.log("texts: ", messages)

            if (messages.length > 0) {
              // const mongoMessages = messages.map(
              //   (msg) => new Message(JSON.parse(msg))
              // );
              // await Message.insertMany(mongoMessages);
              await redis.del(key);
            }
          })

          break;
        }
      }

      if (disconnectedUser) {
        console.log(
          `User ${disconnectedUser} with socket ID ${socket.id} has disconnected.`
        );
        console.log("After disconnetion the user map: ", users);
      } else {
        console.log(`Unregistered socket ID ${socket.id} has disconnected.`);
      }
    });
  });

  // Start the server
  httpServer
    .once("error", (err: NodeJS.ErrnoException) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
