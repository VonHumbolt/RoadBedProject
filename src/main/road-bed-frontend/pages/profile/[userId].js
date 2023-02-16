import Header from "@/components/Header";
import MyFavoritesComponent from "@/components/MyFavoritesComponent";
import MyHouseComponent from "@/components/MyHouseComponent";
import Image from "next/image";
import React, { useRef, useState } from "react";

function Profile({ user, tenant }) {
  const [activeTab, setActiveTab] = useState("myHouse");

  const pictureRef = useRef();

  return (
    <div className="bg-gray-50 h-screen">
      <Header />
      <div className="max-w-7xl mx-auto mt-8">
        <div className="flex">
          {/* Profile Pic */}
          <div className="relative w-32 h-32 mx-4">
            <Image
              className="rounded-full object-cover cursor-pointer"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              fill
              onClick={() => pictureRef.current.click()}
            />
            <input ref={pictureRef} type="file" className="hidden" />
          </div>

          {/* User Information */}
          <div className="bg-gray-100 border border-1 rounded-xl w-full mx-4 shadow-md">
            <div className="flex justify-between">
              <div className="flex flex-col justify-between px-4 py-2">
                <p className="text-2xl font-semibold pt-1">{user.fullName}</p>
                <div className="flex space-x-6">
                  <div
                    className="relative hover:scale-105 active:scale-90
                      transition-all transform duration-200 ease-in-out"
                  >
                    <p
                      className={`${
                        activeTab === "myHouse" ? "underline" : ""
                      } hover:underline underline-offset-4
                     decoration-teal-500 decoration-4 cursor-pointer `}
                      onClick={() => setActiveTab("myHouse")}
                    >
                      My Houses
                    </p>
                    <div
                      className={`absolute -top-3 -right-5 px-2 py-1 bg-teal-500 text-xs text-white
                      font-semibold rounded-full ${
                        tenant.ownHouses.length === 0
                          ? "hidden"
                          : "inline-block"
                      }`}
                    >
                      {tenant.ownHouses.length > 9
                        ? "9+"
                        : tenant.ownHouses.length}
                    </div>
                  </div>
                  <div
                    className="relative hover:scale-105 active:scale-90 transition-all
                   transform duration-200 ease-in-out"
                  >
                    <p
                      className={`${
                        activeTab === "favorites" ? "underline" : ""
                      } hover:underline 
                    underline-offset-4 decoration-teal-500 decoration-4 cursor-pointer `}
                      onClick={() => setActiveTab("favorites")}
                    >
                      Favorite Houses
                    </p>
                    <div
                      className={`absolute -top-3 -right-5 px-2 py-1 bg-teal-500 text-xs text-white
                      font-semibold rounded-full ${
                        user.favoriteHouses.length === 0
                          ? "hidden"
                          : "inline-block"
                      }`}
                    >
                      {user.favoriteHouses.length > 9
                        ? "9+"
                        : user.favoriteHouses.length}
                    </div>
                  </div>
                  <div
                    className="relative hover:scale-105 active:scale-90 transition-all
                   transform duration-200 ease-in-out"
                  >
                    <p
                      className={`${
                        activeTab === "visited" ? "underline" : ""
                      } hover:underline 
                    underline-offset-4 decoration-teal-500 decoration-4 cursor-pointer `}
                      onClick={() => setActiveTab("visited")}
                    >
                      Visited Houses
                    </p>
                    <div
                      className={`absolute -top-3 -right-5 px-2 py-1 bg-teal-500 text-xs text-white
                      font-semibold rounded-full ${
                        tenant.visitedHouses.length === 0
                          ? "hidden"
                          : "inline-block"
                      }`}
                    >
                      {tenant.visitedHouses.length > 9
                        ? "9+"
                        : tenant.visitedHouses.length}
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-2 pr-16">
                <p className="text-xl pt-1 pb-4 font-semibold">Contact</p>
                <p className="text-lg text-gray-600">{user.email}</p>
                <p className="text-lg text-gray-600">0 542 434 32 34</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Houses Or Favorite Houses Components */}
        <div className="mt-16 px-6">
          {activeTab === "myHouse" ? (
            <MyHouseComponent houses={tenant.ownHouses} />
          ) : null}
          {activeTab === "favorites" ? (
            <MyFavoritesComponent houses={user.favoriteHouses} />
          ) : null}
          {activeTab === "visited" ? (
            <MyFavoritesComponent houses={user.favoriteHouses} /> // CHANGE
          ) : null}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { userId } = context.params;

  const user = await fetch(
    "http://localhost:8080/users/getById/" + userId
  ).then((res) => res.json());

  const tenant = await fetch(
    "http://localhost:8080/tenants/getByEmail/" + user.email
  ).then((res) => res.json());
 
  return {
    props: {
      user,
      tenant,
    },
  };
}

export default Profile;
