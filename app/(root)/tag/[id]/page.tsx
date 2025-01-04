import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/shared/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { QuestionFilters } from "@/constants/filters";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";

const Page = async ({ params, searchParams }: URLProps) => {
  const { id } = await params;
  const result = await getQuestionByTagId({
    tagId: id,
    searchQuery: searchParams.query
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route={`/tag/${id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.taggedQuestions.length > 0 ? (
          result.taggedQuestions.map((question) => {
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
            title="Theres no tagged questions to show"
            description="Be the first to make the question! Take the inital step for not only
        you, but also to kickstart eveyone elses journey!"
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </div>
    </>
  );
};
export default Page;
