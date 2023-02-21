import Header from "@/components/Header";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/"
    })
  };

  return (
    <div className="h-screen bg-gray-50">
      <Header />
      <Toaster position="top-center" />
      <div className="grid grid-cols-1 lg:grid-cols-2 w-[500px] sm:w-[1000px] h-[1000px] sm:h-[800px] mx-auto rounded-2xl bg-white shadow-lg
        mt-16 px-2 sm:px-0">
        <div className="mx-auto">
          <img
            className="h-full sm:rounded-l-2xl  object-cover object-bottom"
            src="https://images.pexels.com/photos/599459/pexels-photo-599459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>

        <div className="flex flex-col items-center mt-16 w-[400px] sm:w-full mx-auto">
          <div>
            <Image className="mx-auto mb-1 object-contain" src="https://res.cloudinary.com/dspea8wm4/image/upload/v1676559288/road_icon_kh1xt5.png" width={40} height={40} />
            <h2 className="text-5xl font-semibold text-teal-600">Road Bed</h2>
          </div>

          <h4 className="py-16 text-lg text-gray-600 font-semibold">Welcome to Road Bed</h4>

          <form className="w-full md:w-[500px]  px-16" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-1">
              <label className="px-1 text-sm text-gray-500">Email address</label>
              <input
                {...register("email", {
                  required: "Please enter an email.",
                })}
                className="formInput"
                type="email"
                placeholder="example@example.com"
              />
              <p className="text-[#ed6172] font-semibold px-2 text-start">
                {errors.email?.message}
              </p>
              <label className="px-1 pt-1 text-sm text-gray-500">Password</label>
              <input
                {...register("password", {
                  required: "Please enter your password.",
                })}
                className="formInput"
                type="password"
                placeholder="Your password"
              />
              <p className="text-[#ed6172] font-semibold px-2 text-start">
                {errors.password?.message}
              </p>
            </div>
            <div className="text-center pt-6 pb-1 ">
              <button className="formButton" type="submit">
                Login
              </button>
            </div>
            <p className="pt-6 pb-1 text-center text-gray-500">You don't have an account? </p>
            <p className="mb-2 text-center">
              <Link href="/register">
                <span className="font-semibold underline decoration-2 decoration-teal-600 cursor-pointer">
                  Sign Up Now!
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
