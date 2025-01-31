import NoResult from "@/components/shared/NoResult";
import { getConversations } from "@/lib/actions/conversation.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  return (
    <div className="flex size-full flex-col items-center justify-center pb-6">
      <NoResult
        title="No text box activated yet!"
        description="Be the first to start a conversation"
        link="/"
        linkTitle="Go to Home"
      />
    </div>
  );
};
export default Page;
