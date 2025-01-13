"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);
  // console.log("isOpen: ", isOpen);

  // console.log("searchParams: ", searchParams?.toString());
  console.log("searchContainerRef: ", searchContainerRef);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick); 
    }
  }, []);

  useEffect(() => {
    // Clear global search when local query is present
    if (query) {
      setSearch("");
      setIsOpen(false);
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["global", "type"],
      });
      router.push(newUrl, { scroll: false });
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, query, pathname, router, searchParams]);

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden" ref={searchContainerRef}>
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
        <Input
          disabled={query ? true : false}
          type="text"
          placeholder="Search Globally"
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none dark:text-light-700"
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) {
              setIsOpen(true);
            }
            if (e.target.value === "" && isOpen) {
              setIsOpen(false);
            }
          }}
          value={search}
        />
      </div>
      {
        isOpen && (
          <GlobalResult setIsOpen={setIsOpen}/>
        )
      }
    </div>
  );
};
export default GlobalSearch;
