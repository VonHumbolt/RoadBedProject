import Header from "@/components/Header";
import { houseFromRedux } from "@/redux/houseSlice";
import HouseService from "@/services/houseService";
import { format } from "date-fns";
import moment from "moment/moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { PatternFormat } from "react-number-format";
import { useRouter } from "next/router";

function Payment() {
  const { data: session } = useSession();
  const router = useRouter();

  const houseDetail = useSelector(houseFromRedux);

  const houseService = new HouseService(session);

  const [selectedDates, setSelectedDates] = useState([]);
  const [isPay, setIsPay] = useState(false)

  const startDate = format(houseDetail.startDate, "dd/MM/yy");
  const endDate = format(houseDetail.endDate, "dd/MM/yy");

  useEffect(() => {
    calculateSelectedDates();
  }, []);

  const calculateSelectedDates = () => {
    const datesArray = [];
    let startDate = moment(houseDetail.startDate);
    let endDate = moment(houseDetail.endDate);

    while (startDate.isSameOrBefore(endDate)) {
      datesArray.push(startDate.clone().format("yyyy-MM-DD"));
      startDate.add(1, "days");
    }
    setSelectedDates(datesArray);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const reserveDto = {
      houseId: houseDetail.houseId,
      datesForReserve: selectedDates,
      tenantEmail: session.user.email,
      day: houseDetail.days,
      totalPrice: houseDetail.totalPrice + 100
    };
    setIsPay(true)
    setTimeout(() => {
      houseService.reserveHouse(reserveDto).then((res) => {
        setIsPay(false)
        if (res.status === 200) {
          router.push("/success");
        }
      });
    }, 3000)
  };
  return (
    <div className="">
      <Header />
      <div className="max-w-7xl mx-auto flex justify-between items-center mt-16">
        {/* Image */}
        <div className="hidden sm:inline-block w-1/2 text-center ">
          <img src="/payment_bg.png" />
        </div>
        {/* Payment Section   */}
        <div className="w-1/2 p-6">
          <h1 className="uppercase text-center font-bold text-4xl text-teal-600">
            Payments
          </h1>
          <p className="px-5 pt-4 text-lg font-semibold ">Total Cost</p>
          <div className="border-b border-gray-300 mr-6 ml-5" />
          <div className="grid grid-cols-2 px-5 py-1 pt-2 text-gray-600">
            <p>City</p>
            <p>{houseDetail.city.cityName}</p>
          </div>
          <div className="grid grid-cols-2 px-5 py-1 text-gray-600">
            <p>Days</p>
            <p>{houseDetail.days}</p>
          </div>
          <div className="grid grid-cols-2 px-5 py-1 text-gray-600">
            <p>Days Between</p>
            <p>
              {startDate} - {endDate}
            </p>
          </div>
          <div className="grid grid-cols-2 px-5 py-1 text-gray-600">
            <p>Price</p>
            <p>{houseDetail.totalPrice}₺</p>
          </div>
          <div className="grid grid-cols-2  px-5 py-1 pb-2 text-gray-600">
            <p>Fee</p>
            <p>100₺</p>
          </div>
          <div className="border-b border-gray-300 mr-6 ml-5" />
          <div className="grid grid-cols-2 px-5 py-1 text-lg font-semibold">
            <p>Total Price</p>
            <p>{houseDetail.totalPrice + 100}₺</p>
          </div>

          <h1 className="mt-12 font-semibold text-xl px-5">Card Information</h1>
          <div className="border-b border-gray-300 mr-6 ml-5" />
          <form
            className="flex flex-col mt-4 px-5 space-y-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col">
              <label className="px-1 text-sm">Full Name</label>
              <input
                {...register("fullName", {
                  required: "Please enter your full name.",
                })}
                className="border border-1 px-2 py-2 rounded-lg bg-gray-100
                focus:outline-teal-500 hover:border-teal-500 placeholder:text-sm"
                placeholder="Full Name"
              />
              <p className="text-[#ed6172] font-semibold px-2">
                {errors.fullName?.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="px-1 text-sm">Card Number</label>
              <PatternFormat
                required
                format="#### #### #### ####"
                type="input"
                className="cardNum border border-1 px-2 py-2 rounded-lg bg-gray-100
                focus:outline-teal-500 hover:border-teal-500 placeholder:text-sm"
                placeholder="**** **** **** ****"
              />
            </div>
            <div className="flex justify-between space-x-2">
              <div className="flex flex-col">
                <label className="px-1 text-sm">Expiration Date</label>
                <PatternFormat
                  format="##/##"
                  type="input"
                  className="border border-1 px-2 py-2 rounded-lg bg-gray-100
                  focus:outline-teal-500 hover:border-teal-500 placeholder:text-sm"
                  placeholder="10/23"
                />
                {/* <p className="text-[#ed6172] font-semibold px-2">
                  {errors.expDate?.message}
                </p> */}
              </div>
              <div className="flex flex-col">
                <label className="px-1 text-sm">CVV</label>
                <PatternFormat
                  format="###"
                  type="input"
                  className="border border-1 px-2 py-2 rounded-lg bg-gray-100
                  focus:outline-teal-500 hover:border-teal-500 placeholder:text-sm"
                  placeholder="946"
                />
                {/* <p className="text-[#ed6172] font-semibold px-2">
                  {errors.cvv?.message}
                </p> */}
              </div>
            </div>

            <div className="pt-6 text-center">
              <button
                className="px-8 py-2 bg-teal-500 rounded-2xl shadow-md
              font-semibold text-white hover:scale-105 active:scale-90
              transform transition-all duration-200 ease-in-out"
                type="submit"
              >
                <div className="flex items-center">
                  <span>Pay {houseDetail.totalPrice + 100}₺</span>
                  <div className={`${!isPay ? "hidden": "inline-block"} pl-3`} role="status">
                    <svg
                      aria-hidden="true"
                      class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#ed6172]"
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
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
