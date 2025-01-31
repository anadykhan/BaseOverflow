import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Information from "../shared/Information";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
  clerkId,
}: Props) => {
  // const showActionButton = clerkId && clerkId === author._id

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark100_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* If signed in add edit and delete actions */}
        <SignedIn>
          <EditDeleteAction type="question" itemId={JSON.stringify(_id)} />
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => {
          return <RenderTag key={tag._id} _id={tag._id} name={tag.name} />;
        })}
      </div>

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
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Information
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={upvotes.length}
            title="Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Information
            imgUrl="/assets/icons/message.svg"
            alt="Message"
            value={formatAndDivideNumber(answers.length)}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Information
            imgUrl="/assets/icons/eye.svg"
            alt="Eye"
            value={formatAndDivideNumber(views)}
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
