"use client";

import { useState } from "react";
import { followUser, unfollowUser } from "@/lib/actions/user.action";
import { Button } from "../ui/button.tsx";

interface Props {
  isFollowing: boolean;
  followerId: string;
  followingId: string;
}

const Follow = ({
  isFollowing,
  followerId,
  followingId,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  console.log("followerId: ", followerId, "followingId", followingId, "isFollowing: ", isFollowing);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      if (isFollowing) {
        await unfollowUser({
          followerId,
          followingId,
          path: `/community`,
        });
      } else {
        await followUser({
          followerId,
          followingId,
          path: `/community`,
        });
      }
    } catch (error) {
      console.error("Failed to follow/unfollow:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(isFollowing)

  return (
    <div>
      {isFollowing ? (
        <Button
          className="bg-light-700 dark:bg-dark-400 mt-5 w-full rounded-xl px-4 py-3 dark:text-light-900"
          onClick={handleFollow}
          disabled={isLoading}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          className="primary-gradient mt-5 w-full rounded-xl px-4 py-3 !text-light-900"
          onClick={handleFollow}
          disabled={isLoading}
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default Follow;
