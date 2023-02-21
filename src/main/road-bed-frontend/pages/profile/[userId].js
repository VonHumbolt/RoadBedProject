import Header from "@/components/Header";
import MyFavoritesComponent from "@/components/MyFavoritesComponent";
import MyHouseComponent from "@/components/MyHouseComponent";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { CheckCircleIcon, ClipboardCheckIcon, HeartIcon } from "@heroicons/react/solid";
import TenantService from "@/services/tenantService";
import { useSession } from "next-auth/react";
import { HomeIcon } from "@heroicons/react/solid";
import MyVisitedHouseComponent from "@/components/MyVisitedHouseComponent";

function Profile({ user, tenant }) {
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState("myHouse");
  const [profilePic, setProfilePic] = useState(tenant.profilePicture?.imageUrl);
  const [pictureFile, setPictureFile] = useState();
  const [isPictureChange, setIsPictureChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pictureRef = useRef();

  const changeProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPictureFile(file);
      const url = URL.createObjectURL(file);
      setProfilePic(url);
      setIsPictureChange(true);
    }
  };

  const updateProfilePicture = async () => {
    const tenantService = new TenantService(session);
    const formData = new FormData();
    formData.append("picture", pictureFile);
    setIsLoading(true);

    await tenantService
      .updateProfilePicture(tenant.userId, formData, session.accessToken)
      .then((res) => {
        if (res.status === 200) {
          setIsPictureChange(false);
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-gray-50 h-screen">
      <Header />
      <div className="max-w-7xl mx-auto mt-8">
        <div className="flex">
          {/* Profile Pic */}
       
          <div className="relative w-32 px-12 hidden sm:inline-block">
            <Image
              className="rounded-full object-cover cursor-pointer"
              src={
                profilePic ||
                "https://res.cloudinary.com/dspea8wm4/image/upload/v1676743195/default_profile_pic_aqsicv.jpg"
              }
              fill
              alt=""
              onClick={() => pictureRef.current.click()}
            />
            <CheckCircleIcon
              className={`${
                isPictureChange && !isLoading ? "inline" : "hidden"
              } absolute bottom-0 right-0 cursor-pointer
              hover:scale-105 transform transition-all duration-200 ease-in-out w-10 h-10`}
              color={"#ED6172"}
              onClick={updateProfilePicture}
            />

            <div
              role="status"
              className={`${!isLoading && "hidden"} absolute bottom-0 -right-3`}
            >
              <svg
                aria-hidden="true"
                className="w-10 h-10 mr-2 text-gray-200 animate-spin  fill-[#ED6172]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <input
              ref={pictureRef}
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={changeProfilePic}
            />
          </div>

          {/* User Information */}
          <div className="bg-gray-100 border border-1 rounded-xl w-full mx-4 shadow-md">
            <div className="flex justify-between">
              <div className="flex flex-col justify-between px-4 py-2">
                <p className="text-2xl font-semibold pt-1">{user.fullName}</p>
                <div className="flex space-x-6">
                  <div
                    className={`relative hover:scale-105 active:scale-90
                      transition-all transform duration-200 ease-in-out
                      inline-flex items-center px-5 py-2.5 text-sm
                       font-medium text-center text-white ${activeTab === "myHouse" ? "bg-teal-500" : "bg-white text-black"} 
                       rounded-lg hover:bg-teal-700
                        focus:ring-4 focus:outline-none `}
                  >
                    <div
                      className={`flex items-center
                     decoration-teal-500 decoration-4 cursor-pointer `}
                      onClick={() => setActiveTab("myHouse")}
                    >
                      <HomeIcon className="w-6 h-6 mr-1" />
                      My Houses
                      <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#ed6172] border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                        {tenant.ownHouses.length > 9
                          ? "9+"
                          : tenant.ownHouses.length}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`relative hover:scale-105 active:scale-90
                    transition-all transform duration-200 ease-in-out
                    inline-flex items-center px-5 py-2.5 text-sm
                     font-medium text-center text-white ${activeTab === "favorites" ? "bg-teal-500" : "bg-white text-black"} 
                     rounded-lg hover:bg-teal-700
                      focus:ring-4 focus:outline-none `}
                  >
                    <div
                      className={`flex items-center
                    underline-offset-4 decoration-teal-500 decoration-4 cursor-pointer `}
                      onClick={() => setActiveTab("favorites")}
                    >
                      <HeartIcon className="w-6 h-6 mr-1" />
                      Favorite Houses
                      <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#ed6172] border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                        {user.favoriteHouses.length > 9
                          ? "9+"
                          : user.favoriteHouses.length}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`relative hover:scale-105 active:scale-90
                    transition-all transform duration-200 ease-in-out
                    inline-flex items-center px-5 py-2.5 text-sm
                     font-medium text-center text-white ${activeTab === "visited" ? "bg-teal-500" : "bg-white text-black"} 
                     rounded-lg hover:bg-teal-700
                      focus:ring-4 focus:outline-none `}
                  >
                    <div
                      className={`flex items-center
                   decoration-teal-500 decoration-4 cursor-pointer `}
                      onClick={() => setActiveTab("visited")}
                    >
                      <ClipboardCheckIcon className="w-6 h-6 mr-1" />
                      Visited Houses
                      <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#ed6172] border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                        {tenant.visitedHouses.length > 9
                          ? "9+"
                          : tenant.visitedHouses.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-2 pr-16">
                <p className="text-xl pt-1 pb-4 font-semibold">Contact</p>
                <p className="text-lg text-gray-600 font-medium">{user.email}</p>
                <p className="text-lg text-gray-600 font-medium">0 542 434 32 34</p>
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
            <MyVisitedHouseComponent visits={tenant.visitedHouses} />
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
