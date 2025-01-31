import { LayoutProps } from "@/.next/types/app/layout"
import TextLeftSidebar from "@/components/shared/message/TextLeftSidebar";
import { getConversations } from "@/lib/actions/conversation.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

const Layout = async ({ children }: LayoutProps) => {
  // const { userId } = await auth();
  // const user = await getUserById({ userId });
  // if (!user) {
  //   return null;
  // }
  // const conversations = await getConversations({
  //   userId: JSON.stringify(user._id),
  // });
  
  return (
    <div className="flex w-full justify-between">
      <div className="w-full pr-12">{children}</div>
      <div>
        <TextLeftSidebar/>
      </div>
    </div>
  );
}
export default Layout