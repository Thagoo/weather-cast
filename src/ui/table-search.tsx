import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function TableSearchInput({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="relative flex bg-background">
      <input
        className="bg-background whitespace-nowrap peer block focus:outline-none rounded-md border border-input py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="Search records"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 " />
    </div>
  );
}
