import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection | BaseOverflow",
  description: "Collection page of BaseOverflow",
};

const Home = async ({searchParams}: SearchParamsProps) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }
  const {savedQuestions, isNext} = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.query,
    filter: searchParams.filter,
    page: searchParams.page ? parseInt(searchParams.page.toString()) : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/collection"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      {/* <HomeFilters /> */}

      <div className="mt-10 flex w-full flex-col gap-6">
        {savedQuestions.length > 0 ? (
          savedQuestions.map((question) => {
            return (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            );
          })
        ) : (
          <NoResult
            title="Theres no saved questions to show"
            description="Be the first to make the question! Take the inital step for not only
        you, but also to kickstart eveyone elses journey!"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams.page ? parseInt(searchParams.page.toString()) : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
};
export default Home;
