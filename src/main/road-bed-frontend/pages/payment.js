import Header from "@/components/Header";
import { houseFromRedux } from "@/redux/houseSlice";
import { format } from "date-fns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Payment() {
  const houseDetail = useSelector(houseFromRedux);

  const startDate = format(houseDetail.startDate, "dd/MM/yy");
  const endDate = format(houseDetail.endDate, "dd/MM/yy");

  const difference =
    houseDetail.endDate.getTime() - houseDetail.startDate.getTime();
  const day = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
          <h1 className="uppercase text-center font-bold text-4xl text-teal-600">Payments</h1>
          <p className="px-5 pt-4 text-lg font-semibold ">Total Cost</p>
          <div className="border-b border-gray-300 mr-6 ml-5" />
          <div className="grid grid-cols-2 px-5 py-1 pt-2 text-gray-600">
            <p>City</p>
            <p>{houseDetail.city.cityName}</p>
          </div>
          <div className="grid grid-cols-2 px-5 py-1 text-gray-600">
            <p>Days</p>
            <p>{day}</p>
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
              <label className="px-1">Full Name</label>
              <input
                {...register("fullName", {
                  required: "Please enter your full name.",
                })}
                className="formInput"
                placeholder="Full Name"
              />
              <p className="text-[#ed6172] font-semibold px-2">
                {errors.fullName?.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="px-1">Card Number</label>
              <input
                {...register("cardNumber", {
                  required: "Please enter card number.",
                })}
                className="formInput"
                placeholder="**** **** **** ****"
              />
              <p className="text-[#ed6172] font-semibold px-2">
                {errors.cardNumber?.message}
              </p>
            </div>
            <div className="flex justify-between space-x-2">
              <div className="flex flex-col">
                <label className="px-1">Expiration Date</label>
                <input
                  {...register("expDate", {
                    required: "Please enter expriration date of your number.",
                  })}
                  className="formInput"
                  placeholder="10/23"
                />
                <p className="text-[#ed6172] font-semibold px-2">
                  {errors.expDate?.message}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="px-1">CVV</label>
                <input
                  {...register("cvv", {
                    required: "Please enter CVV.",
                  })}
                  className="formInput"
                  placeholder="946"
                />
                <p className="text-[#ed6172] font-semibold px-2">
                  {errors.cvv?.message}
                </p>
              </div>
            </div>

            <div className="pt-6 text-center">
              <button
                className="px-8 py-2 bg-teal-500 rounded-2xl shadow-md
              font-semibold text-white hover:scale-105 active:scale-90
              transform transition-all duration-200 ease-in-out"
                type="submit"
              >
                Pay {houseDetail.totalPrice + 100}₺
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
