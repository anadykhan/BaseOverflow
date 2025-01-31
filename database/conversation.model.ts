import { Document, model, models, Schema } from "mongoose";

export interface IConversation extends Document {
    participants: Schema.Types.ObjectId[];
    lastMessage: {
        text: string;
        timestamp: Date;
    };
    unreadCount: number;
}

const conversationSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  lastMessage: {
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
  },
  unreadCount: {
    type: Number,
    required: true,
  },
}); 

const Conversation = models.Conversation || model<IConversation>("Conversation", conversationSchema);
export default Conversation;