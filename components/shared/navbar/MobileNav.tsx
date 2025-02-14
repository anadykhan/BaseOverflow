"use client"
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathName = usePathname()
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {
        sidebarLinks.map((item) => {
          const isActive = (pathName.includes(item.route) && item.route.length > 1) || pathName === item.route

          return (
            <SheetClose asChild key={item.route}>
              <Link href={item.route} className={`${isActive ? "primary-gradient rounded-xl text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4`}>  
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20} 
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <p className={`${isActive ? "base-bold" : "base-medium"}`}>{item.label}</p>
              </Link>
            </SheetClose>
          );
        })
      }
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          className="invert-colors sm:hidden"
          alt="Hamburger icon"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-light-900 dark:bg-dark-200 border-none"
      >
        {/* Add SheetHeader with SheetTitle and SheetDescription for accessibility */}
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">
            This panel contains navigation links and options.
          </SheetDescription>
        </SheetHeader>

        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="BaseOverflow"
          />
          <p className="h2-bold font-spaceGrotesk text-dark100_light900">
            Base <span className="text-primary-500">Overflow</span>
          </p>
        </Link>


        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-xl px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-xl px-4 py-3 shadow-none text-dark400_light900">
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
