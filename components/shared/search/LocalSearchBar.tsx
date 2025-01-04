"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const [search, setSearch] = useState(query || "");

  console.log("searchParams: ", searchParams.toString());
  // console.log("pathname: ", pathname)

  useEffect(() => {
    //Debouncing
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(), //"query=bar"
          key: "query",
          value: search,
        });
        // console.log("newUrl: ", newUrl)
        router.push(newUrl, { scroll: false });
      } 
      else {
        if(pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });
          router.push(newUrl, {scroll: false})
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-xl px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="Search Icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        className="paragraph-regular no-focus placeholder text-dark400_light-700 border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="Search Icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};
export default LocalSearchBar;
