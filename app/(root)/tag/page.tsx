import TagCard from "@/components/cards/TagCard";
import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { TagFilters, UserFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags | BaseOverflow",
  description: "Tags page of BaseOverflow",
};

const Page = async ({searchParams}: SearchParamsProps) => {
  const {query, filter, page} = await searchParams;
  const result = await getAllTags({
    searchQuery: query,
    filter: filter,
    page: page ? parseInt(page.toString()) : 1,
  });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/tag"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => {
            return (
              <Link href={`/tag/${tag._id}`} key={tag._id}>
                <TagCard tag={tag} />
              </Link>
            );
          })
        ) : (
          <NoResult
            title="No tags found"
            description="It looks like there are no tags found!"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={page ? parseInt(page.toString()) : 1}
          isNext={result.isNext}
        />
      </div>
    </div>
  );
};
export default Page;
