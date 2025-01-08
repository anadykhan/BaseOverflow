import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Link from "next/link";
import Information from "../shared/Information";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";


interface Props {
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    clerkId: string;
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  createdAt: Date;
  clerkId?: string | null;
}

const AnswerCard = ({
  _id,
  clerkId,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
    // console.log("question: ", question)
  return (
    <div className="card-wrapper p-9 rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${question._id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark100_light900 line-clamp-1 flex-1">
              {question?.title}
            </h3>
          </Link>
        </div>
        {/* If signed in add edit and delete actions */}
        <SignedIn>
          <EditDeleteAction type="answer" itemId={JSON.stringify(_id)} />
        </SignedIn>
      </div>
      {/* <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => {
          return <RenderTag key={tag._id} _id={tag._id} name={tag.name} />;
        })}
      </div> */}

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Information
          imgUrl="/assets/icons/avatar.svg"
          alt="User"
          value={author.name}
          title="- asked 1 hour ago"
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark400_light800"
        />
        <Information
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={upvotes.length}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default AnswerCard;
