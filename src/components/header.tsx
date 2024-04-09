import React from "react";
import logo from "../assets/icons/01d.png";

import Search from "@/components/search";
import Image from "next/image";

const Header = () => {
  return (
    <div className="px-2 md:px-48 md:flex justify-between p-1">
      <div className="flex items-center ">
        <p className="text-2xl text-slate-800 font-semibold "> WeatherCast</p>
      </div>
      <div className="p-2">
        <Search />
      </div>
    </div>
  );
};

export default Header;
