import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/shared/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import RightSidebar from "@/components/shared/RightSidebar";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | BaseOverflow",
  description: "Home page of BaseOverflow",
};

const Home = async ({ searchParams }: SearchParamsProps) => {
  const { query, filter, page } = await searchParams;
  const result = await getQuestions({
    searchQuery: query,
    filter: filter,
    page: page ? parseInt(page.toString()) : 1,
  });

  return (
    <>
      <div className="flex w-full justify-between gap-10">
        <div className="flex flex-col w-full">
          <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="h1-bold text-dark100_light900">All Questions</h1>
            <div className="flex justify-end max-sm:w-full">
              <Link href="/ask-question">
                <Button className="primary-gradient min-h-[40px] rounded-xl px-4 py-3 !text-light-900">
                  Ask a question
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
            <LocalSearchBar
              route="/"
              iconPosition="left"
              imgSrc="/assets/icons/search.svg"
              placeholder="Search for questions"
              otherClasses="flex-1"
            />
            <Filter
              filters={HomePageFilters}
              otherClasses="min-h-[56px] sm:min-w-[170px]"
              containerClasses="hidden max-md:flex"
            />
          </div>

          <HomeFilters />

          <div className="mt-10 flex w-full flex-col gap-6">
            {result.questions.length > 0 ? (
              result.questions.map((question) => {
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
                title="Theres no question to show"
                description="Be the first to make the question! Take the inital step for not only
        you, but also to kickstart eveyone elses journey!"
                link="/ask-question"
                linkTitle="Ask a question"
              />
            )}
          </div>
          <div className="mt-10">
            <Pagination
              pageNumber={result?.page ? parseInt(result.page.toString()) : 1}
              isNext={result.isNext}
            />
          </div>
        </div>
        <div className="hidden xl:block w-[450px]">
          <div className="fixed w-[450px]">
            <RightSidebar />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
