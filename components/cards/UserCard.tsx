import { getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";
import Follow from "../shared/Follow.tsx";
import { getFollowStatus } from "@/lib/actions/user.action.ts";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
    // followers?: Schema.Types.ObjectId[];
    // following?: Schema.Types.ObjectId[];
  },
  currentUserClerkId: string
}

const UserCard = async ({ user, currentUserClerkId }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });
  const isFollowing = await getFollowStatus({currentUserClerkId, userId: user._id});

  return (
    <div className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px] background-light900_dark200 rounded-2xl border p-8">
      <Link href={`/profile/${user?.clerkId}`}>
        <article className="light-border flex w-full flex-col items-center justify-center">
          <Image
            src={user.picture.toString()}
            alt="user profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
              {user.name}
            </h3>
            <p className="body-regular text-dark500_light500 mt-2">
              @{user?.username ? user.username : "user123"}
            </p>
          </div>

          <div className="mt-5">
            {interactedTags.length > 0 ? (
              <div className="flex items-center gap-2">
                {interactedTags.map((tag) => {
                  return (
                    <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
                  );
                })}
              </div>
            ) : (
              <Badge>No tags yet</Badge>
            )}
          </div>
        </article>
      </Link>
      <div className="mt-4 flex justify-between text-dark400_light700">
        <p>
          <span className="font-bold">{user.followers?.length || 0}</span>{" "}
          followers
        </p>
        <p>
          <span className="font-bold">{user.following?.length || 0}</span>{" "}
          following
        </p>
      </div>

      {currentUserClerkId !== user.clerkId && (
        <Follow
          isFollowing={isFollowing}
          followerId={currentUserClerkId}
          followingId={JSON.stringify(user._id)}
        />
      )}
    </div>
  );
};
export default UserCard;
