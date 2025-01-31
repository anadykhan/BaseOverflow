import LeftSidebar from "@/components/shared/LeftSidebar";
import TextLeftSidebar from "@/components/shared/message/TextLeftSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import RightSidebar from "@/components/shared/RightSidebar";
import { Toaster } from "@/components/ui/toaster";
import { headers } from "next/headers";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {

  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className={`max-auto w-full`}>{children}</div>
        </section>
      </div>
      <Toaster />
    </main>
  );
};
export default Layout;
