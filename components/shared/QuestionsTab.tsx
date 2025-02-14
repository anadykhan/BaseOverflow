import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionsTab = async ({ searchParamsProp, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: searchParamsProp ? parseInt(searchParamsProp?.toString()) : 1,
  });
  console.log("searchParams: ", parseInt(searchParamsProp?.toString()));
  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes.length}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
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
export default QuestionsTab;
