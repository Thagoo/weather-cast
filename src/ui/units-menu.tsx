"use client";
import React from "react";
import * as Popover from "@radix-ui/react-popover";
import {
  Bars3BottomRightIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Thermometer } from "lucide-react";

export default function UnitsMenu() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleUnits = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("units", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className=" w-6 bg-background cursor-default outline-none"
          aria-label="Update dimensions"
        >
          <Bars3BottomRightIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[140px] bg-background  will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center text-accent-foreground text-xs font-extralight">
              <Thermometer className="w-4" /> <span>Units </span>
            </div>
            <ul className="cursor-pointer space-y-2 ">
              <li
                onClick={() => handleUnits("metric")}
                className="px-2 rounded-md hover:bg-accent"
              >
                Metric
              </li>
              <li
                onClick={() => handleUnits("imperial")}
                className="px-2 rounded-md hover:bg-accent"
              >
                Imperial
              </li>
              <li
                onClick={() => handleUnits("standard")}
                className="px-2 rounded-md hover:bg-accent"
              >
                Standard
              </li>
            </ul>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
