import React, { useState } from "react";
import { SearchIcon, MenuIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import HeaderMenu from "./HeaderMenu";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Header({ searchQuery }) {
  const { data: session } = useSession();

  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelectDate = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        city: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
  };

  return (
    <header className="shadow-lg p-5 sticky top-0 bg-white z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-3 justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Image
              src="https://res.cloudinary.com/dspea8wm4/image/upload/v1676559288/road_icon_kh1xt5.png"
              className="object-cover h-10 w-10"
              width={1200}
              height={900}
            />
            <h3 className="text-lg font-bold text-teal-500 hidden md:inline-block">
              Road Bed
            </h3>
          </div>
        </Link>
        <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm ">
          <input
            className="flex-grow outline-none bg-transparent pl-5 text-sm text-gray-600
              placeholder-gray-400"
            placeholder={searchQuery || "Search"}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchIcon
            className="hidden md:inline-flex md:mx-2 h-8 bg-teal-400 p-2 rounded-full
            cursor-pointer"
          />
        </div>

        <div className="flex justify-end items-center space-x-4">
          {!session && (
            <Link href="/register">
              <p className="text-gray-500 cursor-pointer hidden sm:inline-block">
                Become a Host
              </p>
            </Link>
          )}
          <div className="relative">
            <div
              className="flex items-center space-x-2 border-2 border-gray-200 rounded-full px-2
                    cursor-pointer hover:shadow-lg hover:scale-105 transition duration-200 ease-in-out"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon className="h-7 w-7" />
              <UserCircleIcon className="h-10 w-10" color="teal" />
            </div>

            {isMenuOpen ? (
              <HeaderMenu
                isLoggedIn={session === null}
                userId={session?.userId}
              />
            ) : null}
          </div>
        </div>
      </div>

      {searchInput && (
        <div className="max-w-7xl mx-auto text-center mt-1">
          <DateRange
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#14B8A5"]}
            onChange={handleSelectDate}
          />
          <div className="flex flex-row w-52 mx-auto justify-between">
            <p
              className="text-slate-800 cursor-pointer
            hover:underline"
              onClick={() => resetInput()}
            >
              Cancel
            </p>
            <p
              className="text-teal-500 cursor-pointer
            hover:underline"
              onClick={() => search()}
            >
              Search
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
