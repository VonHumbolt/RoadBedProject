import { remove } from "@/redux/userSlice";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function HeaderMenu({ isLoggedIn }) {

    const dispatch = useDispatch();

  return (
    <div
      className="absolute rounded-lg border p-3 top-12 -left-1 w-[100px]
              sm:w-[150px] sm:-left-12 bg-white"
    >
        {isLoggedIn ? (
            <div>
                <Link href="/login">
                    <p
                    className="p-1 cursor-pointer hover:scale-105 hover:text-teal-400
                                transition duration-100 ease-out text-start"
                    >
                    Login
                    </p>
                </Link>
                <div className="border my-1" />
                <Link href="/register">
                    <p
                    className="p-1 cursor-pointer hover:scale-105 hover:text-teal-400
                            transition duration-100 ease-out text-start"
                    >
                    Register
                    </p>
                </Link>
            </div>
        ) : (
            <div> 
                <Link href="/create">
                    <p
                    className="p-1 cursor-pointer hover:scale-105 hover:text-teal-400
                                transition duration-100 ease-out text-start"
                    >
                    Create House
                    </p>
                </Link>
                <div className="border my-1" />
                <Link href="/login">
                    <p
                    className="p-1 cursor-pointer hover:scale-105 hover:text-teal-400
                                transition duration-100 ease-out text-start"
                    >
                    Profile
                    </p>
                </Link>
                <div className="border my-1" />
                <p
                className="p-1 cursor-pointer hover:scale-105 hover:text-teal-400
                        transition duration-100 ease-out text-start"
                        onClick={() => {
                            dispatch(remove())
                        }}
                >
                    Logout
                </p>
            </div>

        )}
    </div>
  );
}

export default HeaderMenu;
