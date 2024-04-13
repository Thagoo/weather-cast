"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-9 w-full md:w-auto rounded-md whitespace-nowrap px-4 border border-input bg-background hover:bg-accent/50 hover:text-accent-foreground flex justify-center items-center"
    >
      <SunIcon className="h-4 w-4 transition-all opacity-0  dark:opacity-100" />
      <MoonIcon className="h-4 w-4 absolute transition-all dark:opacity-0" />
    </button>
  );
}
