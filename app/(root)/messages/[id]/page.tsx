import SendTextArea from "@/components/shared/message/SendTextArea";
import TextBody from "@/components/shared/message/TextBody";
import { getSingleConversationFromId } from "@/lib/actions/conversation.action";
import { auth } from "@clerk/nextjs/server";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useParams, useSearchParams } from "next/navigation";

const Page = async ({ params }) => {
  const {userId} = await auth()
  const { id } = await params;
  const participantConversationRes = await getSingleConversationFromId({
    participantClerkId: id,
  });
  return (
    <div className="flex size-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <h1 className="h1-bold text-dark100_light900">Alex Hunter</h1>
        <div className="flex size-10 items-center justify-center rounded-full bg-primary-500 text-white">
          <DotsVerticalIcon />
        </div>
      </div>
      <SendTextArea
        currentClerkIdParams={JSON.stringify(userId)}
        participantConversationParam={JSON.stringify(
          participantConversationRes.participantConversation
        )}
      />
    </div>
  );
};
export default Page;
