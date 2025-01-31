"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import TextBox from "./TextBox.tsx";

interface Message {
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp?: Date;
}

const SendTextArea = ({
  currentClerkIdParams,
  participantConversationParam,
}: {
  currentClerkIdParams: string;
  participantConversationParam: string;
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<Message[]>([]);  // Add this line
  const currentClerkId = JSON.parse(currentClerkIdParams);
  const participantConversation = JSON.parse(participantConversationParam);
  const socketRef = useRef<Socket | null>(null);

  // Update messagesRef whenever messages change
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    console.log("===Inside useEffect===");
    if (!socketRef.current) {
      const socketInstance = io("http://localhost:3000", {
        path: "/api/socket",
        transports: ["websocket", "polling"],
      });

      socketInstance.on("connect", () => {
        console.log("Connected to Socket.IO server");

        socketInstance.emit("register", currentClerkId);
      });

      socketInstance.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      socketRef.current = socketInstance;
    }

    if (participantConversation?._id) {
      socketRef.current?.emit("joinConversation", participantConversation._id);
    }

    // Listen for incoming messages
    socketRef.current?.on("newMessage", (receivedMessage: Message) => {
      if (receivedMessage.conversationId === participantConversation._id) {
        setMessages((prev) => [...prev, receivedMessage]);
      }
    });

    // console.log("Current socket: ", socketRef.current.id)

    return () => {
      console.log("Messages: ", messagesRef.current)
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [participantConversation?._id]);

  const sendMessage = () => {
    console.log("SocketRef ===> ", socketRef.current)

    if (!message.trim() || !socketRef.current || !participantConversation._id) {
      console.log("Cannot change message: Inivalid state");
      return;
    }

    const messageData: Message = {
      conversationId: participantConversation._id,
      senderId: currentClerkId,
      receiverId: participantConversation.participantId,
      text: message,
    };

    socketRef.current.emit("sendMessage", messageData, (response: any) => {
      if (response.status === "ok") {
        console.log("Message sent successfully:", response.messageId);
      } else {
        console.error("Message sending failed");
      }
    });

    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col justify-between pt-10">
      <div className="flex flex-col gap-4 h-full justify-end pb-12">
        {
          messages.map((message, index) => (
            <TextBox key={index} user={true} text={message.text}/>
          ))
        }
      </div>
      <div className="flex-center flex gap-4">
        <div className="background-light800_darkgradient flex min-h-[50px] grow items-center gap-4 rounded-xl px-4">
          <Input
            type="text"
            value={message}
            placeholder="Type your message here..."
            onChange={(e) => setMessage(e.target.value)}
            className="paragraph-regular no-focus placeholder text-dark400_light-700 border-none shadow-none outline-none"
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button
          className="min-h-[50px] rounded-xl bg-primary-500 px-6 text-white"
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default SendTextArea;
