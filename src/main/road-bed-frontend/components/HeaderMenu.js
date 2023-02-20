import { remove } from "@/redux/userSlice";
import {
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  UserAddIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function HeaderMenu({ isLoggedIn, userId }) {
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
              className="p-1 flex items-center space-x-2 cursor-pointer hover:scale-105 hover:text-teal-400
                                transition duration-100 ease-out text-start"
            >
              <LoginIcon className="w-5 h-5" />
              <span>Login</span>
            </p>
          </Link>
          <div className="border my-1" />
          <Link href="/register">
            <p
              className="p-1 flex items-center space-x-2 cursor-pointer hover:scale-105 hover:text-teal-400
                            transition duration-100 ease-out text-start"
            >
              <UserAddIcon className="w-5 h-5" />
              <span>Register</span>
            </p>
          </Link>
        </div>
      ) : (
        <div>
          <Link href="/create">
            <p
              className="p-1 flex items-center cursor-pointer hover:scale-105 hover:text-teal-400
                                transition duration-100 ease-out text-start"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Create House</span>
            </p>
          </Link>
          <div className="border my-1" />
          <Link href={`/profile/${userId}`}>
            <p
              className="p-1 flex items-center space-x-2 cursor-pointer hover:scale-105 hover:text-teal-400
                                transition duration-100 ease-out text-start"
            >
              <UserIcon className="w-5 h-5" />
              <span>Profile</span>
            </p>
          </Link>
          <div className="border my-1" />
          <p
            className="p-1 flex items-center space-x-2 cursor-pointer hover:scale-105 hover:text-teal-400
                        transition duration-100 ease-out text-start"
            onClick={() => {
              dispatch(remove());
              signOut();
            }}
          >
            <LogoutIcon className="w-5 h-5" />
            <span>Logout</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default HeaderMenu;
