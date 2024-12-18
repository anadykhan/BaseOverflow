import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  // const { userId } = currentUser();
  const userId = "clerk_1234567890";

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongUserId = {JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};
export default Page;
