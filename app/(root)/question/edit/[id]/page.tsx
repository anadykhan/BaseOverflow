import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

const Page = async ({params}) => {
  const { userId } = await auth();
  const {id} = await params

  if(!userId) {
    return null
  }

  const mongoUser = await getUserById({userId})
  const questionDetail = await getQuestionById({ questionId: id });

  return (
    <>
      <h1 className="h1-bold text_dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="edit"
          mongoUserId={mongoUser._id}
          questionDetail={JSON.stringify(questionDetail)}
        />
      </div>
    </>
  );
};
export default Page;
