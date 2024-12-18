import { Input } from "@/components/ui/input"
import Image from "next/image"

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
        <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 px-4 rounded-xl">
            <Image
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="Search"
            className="cursor-pointer"
            />
            <Input
            type="text"
            placeholder="Search Globally"
            className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none dark:text-light-900"
            />
        </div>
    </div>
  )
}
export default GlobalSearch