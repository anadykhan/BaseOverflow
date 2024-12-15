import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import HomeFilters from "@/components/shared/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to learn TypeScript effectively?",
    tags: [
      { _id: "101", name: "TypeScript" },
      { _id: "102", name: "Programming" },
    ],
    author: {
      _id: "201",
      name: "John Doe",
      picture: "https://example.com/images/john-doe.jpg",
    },
    upvotes: 25,
    views: 150,
    answers: [
      {
        _id: "301",
        text: "Focus on understanding TypeScript's type system.",
        author: { _id: "202", name: "Jane Smith" },
      },
    ],
    createdAt: new Date("2023-12-01T10:30:00Z"),
  },
  {
    _id: "2",
    title: "What are the benefits of using React?",
    tags: [
      { _id: "103", name: "React" },
      { _id: "104", name: "Frontend" },
    ],
    author: {
      _id: "203",
      name: "Alice Johnson",
      picture: "https://example.com/images/alice-johnson.jpg",
    },
    upvotes: 40,
    views: 250,
    answers: [
      {
        _id: "302",
        text: "React is efficient and supports reusable components.",
        author: { _id: "204", name: "Bob Brown" },
      },
      {
        _id: "303",
        text: "It has a strong community and ecosystem.",
        author: { _id: "205", name: "Charlie Green" },
      },
    ],
    createdAt: new Date("2023-12-05T08:00:00Z"),
  },
  {
    _id: "3",
    title: "How do you manage state in a large application?",
    tags: [
      { _id: "105", name: "State Management" },
      { _id: "106", name: "Redux" },
    ],
    author: {
      _id: "206",
      name: "Emily White",
      picture: "https://example.com/images/emily-white.jpg",
    },
    upvotes: 15,
    views: 90,
    answers: [],
    createdAt: new Date("2023-12-10T14:15:00Z"),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <div className="flex justify-end max-sm:w-full">
          <Link href="/ask-question">
            <Button className="primary-gradient !text-light-900 min-h-[40px] rounded-xl px-4 py-3">
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
        {questions.length > 0 ? (
          questions.map((question) => {
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
    </>
  );
};
export default Home;
