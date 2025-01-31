import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.action";
import HotQuestions from "./HotQuestions";
import TopTags from "./TopTags";

const RightSidebar = async () => {
  

  return (
    <section className="flex flex-col max-lg:hidden lg:w-[350px] gap-5">
      <HotQuestions />
      <TopTags />
    </section>
  );
};
export default RightSidebar;
