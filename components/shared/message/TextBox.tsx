"use client";
import { useState } from "react";

const TextBox = ({ user, text }: { user: bool, text: string }) => {
  const [clicked, isClicked] = useState(false);
  return (
    <div
      className="flex w-fit flex-col justify-end gap-2"
      onClick={() => isClicked(!clicked)}
    >
      <div
        className={`rounded-xl ${user ? "bg-primary-500 text-white" : "bg-light-700 dark:bg-dark-300"} p-4 text-dark-100 dark:text-white `}
      >
       {text}
      </div>
      {clicked && (
        <div className="text-dark500_light700 text-sm">Sent at 12:00 pm</div>
      )}
    </div>
  );
};
export default TextBox;
