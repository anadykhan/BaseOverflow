import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";
import { popularTags } from "@/constants";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: 1,
      title: "How do i express a custom server in Next.Js?",
    },
    {
      _id: 2,
      title: "Cascading deletes in SQLAcademy?",
    },
    {
      _id: 3,
      title: "How to perfectly center a div in tailwind css?",
    },
    {
      _id: 4,
      title:
        "Best practices for data fetching in a Next.js application with Server-side Rendering?",
    },
    {
      _id: 5,
      title: "Redux is not updating state as expected",
    },
  ];
  return (
    <section className="background-light900_dark200 light-border shadow-light-300 custom-scrollbar sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 max-lg:hidden lg:w-[350px] dark:shadow-none">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((questions) => {
            return (
              <Link
                href={`/questions/${questions._id}`}
                key={questions._id}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {questions.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="Chevron right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => {
            return (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default RightSidebar;
