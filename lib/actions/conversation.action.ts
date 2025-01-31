"use server";

import Conversation from "@/database/conversation.model";
import { connectToDatabase } from "../mongoose";
import { getUserById } from "./user.action";

export async function getConversations(params) {
  try {
    await connectToDatabase();

    const { userId } = params;
    const clerkObjectId = await JSON.parse(userId);
    const user = await getUserById({ userId: clerkObjectId });
    // Convert the string userId to ObjectId

    const conversations = await Conversation.find({
      participants: user?._id,
    }).populate({
      path: "participants",
      model: "User",
      select: "name email picture clerkId", // Add whatever fields you want from the User model
    });

    if (!conversations || conversations.length === 0) {
      console.log("No conversations found");
      return { conversations: [] };
    }

    return { conversations };
  } catch (error) {
    console.log("Error in getConversations:", error);
    throw error;
  }
}

export async function getSingleConversationFromId(params) {
  try {
    await connectToDatabase();

    const { participantClerkId } = params;

    const participantUser = await getUserById({ userId: participantClerkId });

    const participantConversation = await Conversation.findOne({
      participants: participantUser._id,
    }).populate({
      path: "participants",
      model: "User",
      select: "name email picture clerkId",
    });

    if (!participantConversation) {
      return "No conversation found!";
    }

    return { participantConversation };
  } catch (error) {
    console.log("Get Single conversation failed: ", error);
    throw error;
  }
}

export async function updateLastMessage(params) {
  try {
    connectToDatabase();

    await Conversation.findByIdAndUpdate(params.message?.conversationId, {
      lastMessage: {
        text: params.message?.text,
        timestamp: new Date(),
      },
      $inc: { unreadCount: 1 },
    });
  } catch (error) {
    throw error;
  }
}
