import React from "react";
import { CommandDialogDemo } from "./CommandDialog";
import { ThemeToggle } from "@/ui/theme-toggle";
import Link from "next/link";

const Header = () => {
  return (
    <div className="px-2 md:px-48 md:gap-4 gap-1 flex flex-row  p-1">
      <Link href={"/"} className="flex-grow">
        <p className="text-2xl text-slate-900 dark:text-white font-semibold ">
          {" "}
          WeatherCast
        </p>
      </Link>
      <CommandDialogDemo />
      <ThemeToggle />
    </div>
  );
};

export default Header;
