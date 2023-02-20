import Header from "@/components/Header";
import { houseFromRedux } from "@/redux/houseSlice";
import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";

function Success() {
  const reservation = useSelector(houseFromRedux);

  const startDate = format(reservation?.startDate, "dd MMMM yyyy");
  const endDate = format(reservation?.endDate, "dd MMMM yyyy");

  return (
    <div>
      <Header />

      <div className="max-w-7xl mx-auto mt-16">
        <div className="flex flex-col items-center px-8 sm:px-6 md:px-0">
          <h1 className="uppercase font-extrabold text-3xl text-teal-600">
            Payment is successful!
          </h1>
          <p className="text-xl mt-8 text-center font-medium">
            Your reservation has been received in{" "}
            <span className="font-bold"> {reservation.city?.cityName} </span>
            for <span className="font-bold">{reservation.days} </span> days from{" "}
            <span className="font-bold"> {startDate} </span> to{" "}
            <span className="font-bold"> {endDate} </span>.
          </p>
          <p className="text-xl my-4 font-medium">
            We hope you enjoy your visit.
          </p>
          <img className="w-1/2" src="/success_bg.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Success;
