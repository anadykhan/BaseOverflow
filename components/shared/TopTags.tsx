import { getPopularTags } from "@/lib/actions/tag.action";
import RenderTag from "./RenderTag";

const TopTags = async () => {
    const popularTags = await getPopularTags();
  return (
    <div className="background-light900_dark200 p-6 rounded-xl light-border overflow-y-auto dark:shadow-none shadow-light-300 border-l">
      <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
      <div className="mt-7 flex flex-col gap-4">
        {popularTags.map((tag) => {
          return (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.numberOfQuestions}
              showCount
            />
          );
        })}
      </div>
    </div>
  );
}
export default TopTags