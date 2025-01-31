import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import page from "../(home)/page";
import Loading from "./loading";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Community | BaseOverflow",
  description: "Community page of BaseOverflow",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const {userId} = await auth()
  const { query, filter, page } = await searchParams;
  const { users, isNext } = await getAllUsers({
    searchQuery: query,
    filter: filter,
    page: page ? parseInt(page.toString()) : 1,
  });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />
        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {users.length > 0 ? (
          users.map((user) => {
            return (
              <UserCard
                key={user._id}
                user={user}
                currentUserClerkId={userId}
              />
            );
          })
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first
            </Link>
          </div>
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={page ? parseInt(page.toString()) : 1}
          isNext={isNext}
        />
      </div>
    </div>
  );
};
export default Page;
