import { AnswerFilters } from "@/constants/filters";
import Filter from "./Filter";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";

interface Props {
  questionId: string;
  authorId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({ questionId, authorId, totalAnswers, filter }: Props) => {
  const result = await getAnswers({
    questionId: JSON.parse(questionId),
    filter
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>

        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.map((answer) => {
          return (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="flex items-center justify-between">
                <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                  <Link
                    className="flex flex-1 items-start gap-1 sm:items-center"
                    href={`/profile/${answer.clerkId}`}
                  >
                    <Image
                      src={answer.author.picture}
                      width={18}
                      height={18}
                      className="max-sm:mt-0.5] rounded-full object-cover"
                      alt="User profile picture"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="body-semibold text-dark300_light700">
                        {answer.author.name}
                      </p>
                      <p className="small-regular text-dark400_light500 mt-0.5 line-clamp-1 ml-0.5">
                        <span className="max-sm:hidden">- </span>
                        answered {getTimestamp(answer.createdAt)}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-end">
                    <Votes
                      type="answer"
                      itemId={JSON.stringify(answer._id.toString())}
                      userId={JSON.stringify(authorId.toString())}
                      upvotes={answer.upvotes.length}
                      hasUpvoted={answer.upvotes.includes(authorId)}
                      downvotes={answer.downvotes.length}
                      hasDownvoted={answer.downvotes.includes(authorId)}
                    />
                  </div>
                </div>
              </div>
              <ParseHTML data={answer.content} />
            </article>
          );
        })}
      </div>
    </div>
  );
};
export default AllAnswers;
