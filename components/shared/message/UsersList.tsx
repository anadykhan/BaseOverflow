"use client";
import Link from "next/link";
import UserBox from "./UserBox";
import { useState } from "react";

const UsersList = ({ conversations, clerkId }) => {
  const conversationObject = JSON.parse(conversations);
  
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <div>
      {conversationObject?.conversations?.map((conversation, index) => {

        // Filtered participant which is not the current user
        const filteredParticipant = conversation.participants.filter(
          (participant) => {
            return (
              participant.clerkId.trim().toString() !==
              JSON.parse(clerkId).trim().toString()
            );
          }
        );

        return (
          <Link
            href={`/messages/${filteredParticipant[0]?.clerkId}`}
            key={filteredParticipant[0]?.clerkId}
            className="w-full"
          >
            <UserBox
              key={filteredParticipant[0]?.clerkId}
              clerkId={JSON.stringify(filteredParticipant[0]?.clerkId)}
              name={filteredParticipant[0]?.name}
              isSelected={filteredParticipant[0]?.clerkId === selectedUser}
              lastMessage={conversation.lastMessage.text}
            />
          </Link>
        );
      })}
    </div>
  );
};
export default UsersList;
