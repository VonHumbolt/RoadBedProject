import React from "react";
import { SearchIcon, MenuIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="shadow-lg p-5 sticky top-0">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="./road_icon.png"
              className="object-cover h-10 w-10"
            />
            <h3 className="text-lg font-bold text-teal-500 hidden md:inline-block">
              Road Bed
            </h3>
          </div>
        </Link>

        <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
          <input
            className="flex-grow outline-none bg-transparent pl-5 text-sm text-gray-600
              placeholder-gray-400"
            placeholder="Search"
          />
          <SearchIcon className="hidden md:inline-flex md:mx-2 h-8 bg-teal-400 p-2 rounded-full
            cursor-pointer" />
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <p className="text-gray-500 cursor-pointer hidden sm:inline-block">
              Become a Host
            </p>
          </Link>
          <div
            className="flex items-center space-x-2 border-2 border-gray-200 rounded-full px-2
                    cursor-pointer hover:shadow-lg hover:scale-105 transition duration-200 ease-in-out"
          >
            <MenuIcon className="h-7 w-7" />
            <UserCircleIcon className="h-10 w-10" color="teal" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
