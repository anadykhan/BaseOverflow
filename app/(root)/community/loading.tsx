import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <h1 className="bold h1-boldq text-dark100_light900">All Users</h1>
      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1 bg-slate-200 dark:bg-slate-700" />
        <Skeleton className="h-14 w-28 bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-60 w-full rounded-2xl rounded-2xl sm:w-[260px] bg-slate-200 dark:bg-slate-700" />
        ))}
      </div>

    </section>
  );
}
export default Loading