import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const AnswersTab = async ({ searchParamsProp, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParamsProp ? parseInt(searchParamsProp?.toString()) : 1,
  });
  // console.log(result)
  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.questionId}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}
      <div className="mt-10">
        <Pagination
          pageNumber={
            searchParamsProp ? parseInt(searchParamsProp?.toString()) : 1
          }
          isNext={result.isNext}
        />
      </div>
    </>
  );
};
export default AnswersTab;
