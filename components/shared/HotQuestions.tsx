import { getHotQuestions } from "@/lib/actions/question.action";
import Image from "next/image";
import Link from "next/link";

const HotQuestions = async () => {
    const hotQuestions = await getHotQuestions();
  return (
    <div className="background-light900_dark200 p-6 rounded-xl light-border overflow-y-auto dark:shadow-none shadow-light-300 border-l">
      <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {hotQuestions.map((questions) => {
          return (
            <Link
              href={`/question/${questions._id}`}
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
  );
}
export default HotQuestions