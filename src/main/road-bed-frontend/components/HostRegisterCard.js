import Image from "next/image";
import React from "react";

function HostRegisterCard() {
  return (
    <div
      className="my-24 relative w-[400px] sm:w-[600px]
        md:w-[700px] lg:w-[800px] xl:w-[900px] 2xl:w-[1000px]
     bg-[#ed6172] mx-auto p-5 rounded-xl text-white flex flex-row space-x-4
     cursor-pointer hover:shadow-lg"
    >
      <img
        className="object-cover w-1/2 rounded-lg"
        width={100}
        height={300}
        src="https://img.freepik.com/free-vector/realtor-assistance-illustration-concept_23-2148657181.jpg?w=1380&t=st=1675119088~exp=1675119688~hmac=b41ba7eb007acca4aa914697d7cc771d1ad66228f587a26221799e7a92febf04"
      />

      <div className="w-1/2 space-y-5 flex flex-col justify-center items-center">
        <h2 className="font-bold text-lg sm:text-xl 2xl:text-3xl">
          {" "}
          Move your house to Road Bed
        </h2>
        <p className="text-sm sm:text-md 2xl:text-xl">
          Register now and start to earn income
        </p>
      </div>
    </div>
  );
}

export default HostRegisterCard;
