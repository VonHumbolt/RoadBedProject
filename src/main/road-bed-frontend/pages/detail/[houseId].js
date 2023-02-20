import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { DateRange } from "react-date-range";
import ImageDialog from "@/components/ImageDialog";
import UserService from "@/services/userService";
import {
  FaWifi,
  FaSwimmingPool,
  FaTree,
  FaUtensils,
  FaBath,
} from "react-icons/fa";
import { SiNetflix } from "react-icons/si";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { add, remove } from "@/redux/houseSlice";
import { toast, Toaster } from "react-hot-toast";

function HouseDetail({ house, firstImage, secondImage, thirdImage, tenant }) {
  const { data: session } = useSession();
  const userService = new UserService(session);

  const router = useRouter();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const [isFavorite, setIsFavorite] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDayCount, setSelectedDayCount] = useState(1);
  const [user, setUser] = useState({});

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    if (session) {
      await userService.getByEmail(session?.user?.email).then((res) => {
        const userInfo = res.data;
        let isHouseFavorite = userInfo.favoriteHouses?.some(
          (h) => h.houseId === house.houseId
        );

        setUser(userInfo);
        setIsFavorite(isHouseFavorite);
      });
    }
  };

  const handleSelectDate = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);

    let difference =
      ranges.selection.endDate.getTime() - ranges.selection.startDate.getTime();
    let day = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    setSelectedDayCount(day);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSelectImage = (image) => {
    setIsOpen(true);
    setSelectedImage(image);
  };

  const handleFavoriteHouseIcon = () => {
    if (session) {
      if (!isFavorite) {
        toast.promise(
          userService.addHouseToFavorites(user?.userId, house).then((res) => {
            if (res.status === 200) setIsFavorite(true);
          }),
          {
            loading: "Saving...",
            success: <b>Added to favourites!</b>,
            error: <b>Could not added.</b>,
          }
        );
      } else {
        toast.promise(
          userService
            .removeHouseFromFavorites(user?.userId, house)
            .then((res) => {
              if (res.status === 200) setIsFavorite(false);
            }),
          {
            loading: "Removing...",
            success: <b>Removed from favourites!</b>,
            error: <b>Could not removed.</b>,
          }
        );
      }
    } else {
      toast.error("Please login to add to favourites.", {
        style: {
          border: "1px solid #ed6172",
          padding: "8px",
          color: "#ed6172",
        },
        iconTheme: {
          primary: "#ed6172",
          secondary: "#FFFAEE",
        },
      });
    }
  };

  const calculateDaysBetweenDates = () => {
    const difference = endDate.getTime() - startDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24)) + 1;
  };

  const goToPayment = () => {
    if (session) {
      dispatch(remove());

      const days = calculateDaysBetweenDates();
      const houseForReserve = {
        houseId: house.houseId,
        city: house.city,
        startDate: startDate,
        endDate: endDate,
        days: days,
        totalPrice: selectedDayCount * house.price + 100,
      };
      dispatch(add(houseForReserve));
      router.push("/payment");
    } else {
      toast.error("Please login to reserve a house.", {
        style: {
          border: "1px solid #ed6172",
          padding: "8px",
          color: "#ed6172",
        },
        iconTheme: {
          primary: "#ed6172",
          secondary: "#FFFAEE",
        }
      });
    }
  };

  return (
    <div className="pb-10">
      <Header />
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 px-6 py-12 w-full h-64">
          {/* Images */}
          <div className="">
            <div className="flex flex-row">
              <Image
                src={firstImage}
                className="w-[400px] h-60 object-cover cursor-pointer rounded-lg shadow-md
                    hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg hover:z-10"
                width={1200}
                height={100}
                onClick={() => handleSelectImage(firstImage)}
              />
              <div className="space-y-4 ml-1 flex flex-col">
                {secondImage && (
                  <Image
                    src={secondImage}
                    className="w-[200px] h-28 object-cover mx-auto sm:mx-0 cursor-pointer rounded-lg shadow-md
                    hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg"
                    width={1200}
                    height={100}
                    onClick={() => handleSelectImage(secondImage)}
                  />
                )}
                {thirdImage && (
                  <Image
                    src={thirdImage}
                    className="w-[200px] h-28 object-cover mx-auto sm:mx-0 cursor-pointer rounded-lg shadow-md
                    hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg"
                    width={1200}
                    height={100}
                    onClick={() => handleSelectImage(thirdImage)}
                  />
                )}
              </div>
            </div>
            <div className="mt-2">
              <p
                className="text-gray-500 text-sm text-center cursor-pointer
                        hover:underline pb-4"
              >
                Show all images
              </p>

              <div className="flex items-center px-2">
                <Image
                  className="h-8 w-8 object-cover rounded-full"
                  src={
                    tenant?.profilePicture?.imageUrl ||
                    "https://res.cloudinary.com/dspea8wm4/image/upload/v1676743195/default_profile_pic_aqsicv.jpg"
                  }
                  width={100}
                  height={100}
                />
                <p className="pl-2 text-gray-600 text-md ">Your Host: </p>
                   
                <p className="pl-2 text-gray-600 text-md font-semibold">
                  {house.owner.fullName}
                </p>
              </div>
            </div>

            <div className="mt-5 px-3">
              <h3 className="font-semibold text-xl border-t pt-2">
                Services you will have in this house
              </h3>
              <div className="grid grid-cols-2 mt-6">
                <div className="text-lg space-y-2 mr-2">
                  <div className="flex items-center space-x-2 text-xl border-2 p-3 rounded-lg">
                    <FaWifi color="#14B8A5" />
                    <span> Wifi</span>
                  </div>
                  <div className="flex items-center space-x-2  text-xl border-2 p-3 rounded-lg">
                    <FaBath color="#14B8A5" />
                    <span>Bathroom</span>
                  </div>
                  <div className="flex items-center space-x-2  text-xl border-2 p-3 rounded-lg">
                    <SiNetflix color="#14B8A5" />
                    <span>Netflix</span>
                  </div>
                </div>
                <div className="text-lg space-y-2">
                  <div className="flex items-center space-x-2 text-xl border-2 p-3 rounded-lg">
                    <FaSwimmingPool color="#14B8A5" />
                    <span> Pool</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xl border-2 p-3 rounded-lg">
                    <FaTree color="#14B8A5" />
                    <span>Garden</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xl border-2 p-3 rounded-lg">
                    <FaUtensils color="#14B8A5" />
                    <span>Kitchen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* FeaturesCard */}
          <div className="space-y-2 mt-6 sm:mt-0 ">
            <div className="bg-white p-6 rounded-lg shadow-md w-2/3 mx-auto">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">{house.description}</p>
                <HeartIcon
                  className="h-6 w-6 cursor-pointer transform transition-all ease-in-out
                  hover:animate-bounce"
                  color="#14B8A5"
                  fill={`${isFavorite === false ? "#fff" : "#14b8a5"}`}
                  onClick={() => handleFavoriteHouseIcon()}
                />
              </div>
              <div className="border-r-2 border-l-2 border-1 border-teal-500 w-fit px-1 mt-1">
                <p className="text-gray-500">{house.category.categoryName}</p>
              </div>
              <p className="pt-1 text-gray-500">{house.capacity} guests</p>
              <p className="text-gray-500 pt-1">{house.city.cityName}</p>
              <p className="pt-1 text-gray-500">{house.address}</p>
              <p className="pt-2 text-end">
                {" "}
                <span className="font-bold text-lg"> {house.price}₺ </span> /
                <span className="text-sm"> Night </span>
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md w-2/3 mx-auto">
              <p className="text-gray-800 font-semibold pt-1 pb-2 px-1">Cost</p>
              <div className="border border-1 border-gray-200 my-1" />
              <div className="flex justify-between items-center space-y-1 pt-2 px-1">
                <p className="text-gray-500">
                  {selectedDayCount} x {house.price}₺
                </p>
                <p className="text-gray-500 font-semibold">
                  {selectedDayCount * house.price}₺
                </p>
              </div>
              <div className="flex justify-between items-center space-y-1 pb-2 px-1">
                <p className="text-gray-500">Fee</p>
                <p className="text-gray-500 font-semibold">100₺</p>
              </div>
              <div className="border border-1 border-gray-200 my-1" />
              <div className="flex justify-between px-1 items-center pt-2">
                <p className="font-semibold">Total Amount</p>
                <p className="font-bold text-lg">
                  {selectedDayCount * house.price + 100}₺
                </p>
              </div>
              <div className="text-center mt-6">
                <button
                  className="mx-auto px-4 py-1 rounded-lg font-bold bg-teal-500 shadow-md
                    hover:scale-105 hover:shadow-lg transform transition-all duration-200 ease-in-out
                    text-gray-50"
                  onClick={() => goToPayment()}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[900px] sm:mt-96 lg:mt-42 p-6">
          <div className="hidden sm:inline">
            <DateRange
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#14B8A5"]}
              months={2}
              disabledDates={house.reservedDates.map((d) => new Date(d))}
              direction="horizontal"
              onChange={handleSelectDate}
            />
          </div>
          <div className="sm:hidden text-center">
            <DateRange
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#14B8A5"]}
              disabledDates={house.reservedDates.map((d) => new Date(d))}
              direction="horizontal"
              onChange={handleSelectDate}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <ImageDialog
          imageUrl={selectedImage}
          isOpen={isOpen}
          closeModal={closeModal}
          isRemoveBtnExist={false}
        />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  let { houseId } = context.params;

  const house = await fetch(
    "http://localhost:8080/houses/getById/" + houseId
  ).then((res) => res.json());

  const tenant = await fetch(
    "http://localhost:8080/tenants/getByEmail/" + house.owner.email
  ).then((res) => res.json());

  let firstImage = house.imageUrlList[0].imageUrl;
  let secondImage = house.imageUrlList[1]
    ? house.imageUrlList[1].imageUrl
    : null;
  let thirdImage = house.imageUrlList[2]
    ? house.imageUrlList[2].imageUrl
    : null;

  return {
    props: {
      house,
      firstImage,
      secondImage,
      thirdImage,
      tenant,
    },
  };
}

export default HouseDetail;
