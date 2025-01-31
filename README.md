This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Future Upgrade

- Dont add reputation to the user who interacts with their own question or answer
- Add reputation count if the view is more than 1000

Rough code (socket/route.ts):
// import Conversation from "@/database/conversation.model";
// import Message from "@/database/message.model";
// import { connectToDatabase } from "@/lib/mongoose";
// import { NextApiRequest, NextApiResponse } from "next";
// import { Server as IOServer, Socket } from "socket.io";

// let io: IOServer | undefined;

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//     if(!res.socket.server.io) {
//         console.log("Initializing socket...");

//         const io = new IOServer(res.socket.server, {
//             path: "/api/socket",
//             addTrailingSlash: false,
//         });

//         res.socket.server.io = io;
        
//         io.on("connection", (socket) => {
//             console.log("A user connected: ${socket.id}");

//             socket.on("joinConversation", (conversationId: string) => {
//                 socket.join(conversationId);
//                 console.log(`User joined conversation: ${conversationId}`);
//             });

//             socket.on("sendMessage", async (messageData) => {
//                 try {
//                     connectToDatabase()
//                     const { conversationId, senderId, receiverId, text } =
//                       messageData;

//                       console.log("messageData: ", messageData)

//                     // const newMessage = await Message.create({
//                     //     conversationId,
//                     //     senderId,
//                     //     receiverId,
//                     //     text,
//                     //     timestamp: new Date(),
//                     //     isRead: false,
//                     // });

//                     // await Conversation.findByIdAndUpdate(conversationId, {
//                     //     lastMessage: {
//                     //         text,
//                     //         timeStamp: new Date(),
//                     //     },
//                     //     $inc: {unreadCount: 1},
//                     // })

//                     // io.to(conversationId).emit("receiveMessage", newMessage);
                    
//                 } catch (error) {
//                     console.log("Error sending message:", error);
//                     throw error;
//                 }
//             });

//             socket.on("markAsRead", async (conversationId, userId) => {
//                 try {
//                     // await connectToDatabase();

//                     // await Message.updateMany({
//                     //     conversationId,
//                     //     receiverId: userId,
//                     //     isRead: false,
//                     // }, 
//                     // {isRead: true});

//                     // await Conversation.findByIdAndUpdate(conversationId, {
//                     //     $set: {unreadCount: 0},
//                     // });

//                     // io?.to(conversationId).emit("messageRead", {conversationId, userId});

//                 } catch (error) {
//                     console.log("Error marking message as read:", error);
//                     throw error;
//                 }
//             });

//             socket.on("disconnect", () => {
//                 console.log("A user disconnected: ${socket.id}");
//             });
//         })
//     }

//     res.end();
// };

// export default handler;