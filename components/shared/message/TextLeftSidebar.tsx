import { auth } from "@clerk/nextjs/server";
import LocalSearchBar from "../search/LocalSearchBar";
import UserSearchModal from "./UserSearchModal";
import UsersList from "./UsersList";
import { getUserById } from "@/lib/actions/user.action";
import { getConversations } from "@/lib/actions/conversation.action";

const TextLeftSidebar = async () => {
  const { userId } = await auth();

  const conversitons = await getConversations({
    userId: JSON.stringify(userId),
  });

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-[750px] flex-col items-center gap-8 overflow-y-auto rounded-xl border-r py-6 shadow-light-300 dark:shadow-none max-lg:hidden lg:w-[330px]">
      <div className="flex flex-col gap-7">
        <div className="flex w-full items-center justify-between">
          <h1 className="h3-bold text-dark-100 dark:text-light-800">
            Messages
          </h1>
          <UserSearchModal cuurentClerkId={userId} />
        </div>
        <LocalSearchBar
          route="/messages"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for messages"
          otherClasses="flex-1 w-[260px]"
        />
      </div>
      {/* <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item, index) => {
          const isActive =
            (pathName.includes(item.route) && item.route.length > 1) ||
            pathName === item.route;

          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`;
            } else {
              return null;
            }
          }

          return (
            <Link
              href={item.route}
              key={index}
              className={`${isActive ? "primary-gradient rounded-xl text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div> */}
      <div className="flex w-full flex-col gap-2">
        <UsersList
          conversations={JSON.stringify(conversitons)}
          clerkId={JSON.stringify(userId)}
        />
      </div>
    </section>
  );
};
export default TextLeftSidebar;
