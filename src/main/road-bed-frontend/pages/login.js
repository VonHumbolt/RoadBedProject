import Header from "@/components/Header";
import { save } from "@/redux/userSlice";
import AuthService from "@/services/authService";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Login() {
  const authService = new AuthService();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    authService.login(data).then((result) => {
      dispatch(save(result.data));
    });
  };

  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-row bg-gray-100">
        <div className="w-1/2">
          <img
            className="h-[1200px] object-cover object-bottom"
            src="https://images.pexels.com/photos/599459/pexels-photo-599459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center mt-24">
          <div>
            <img className="mx-auto mb-1" src="./road_icon.png" />
            <h2 className="text-5xl font-semibold">Road Bed</h2>
          </div>

          <h4 className="py-16 text-lg text-gray-600 font-semibold">Welcome to Road Bed</h4>

          <form className="w-full md:w-[500px]  px-16" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2">
              <label className="px-1 text-sm text-gray-500">Email</label>
              <input
                {...register("email", {
                  required: "Please enter an email.",
                })}
                className="formInput"
                type="email"
                placeholder="Email address"
              />
              <p className="text-[#ed6172] font-semibold px-2 text-start">
                {errors.email?.message}
              </p>
              <label className="px-1 text-sm text-gray-500">Password</label>
              <input
                {...register("password", {
                  required: "Please enter your password.",
                })}
                className="formInput"
                type="password"
                placeholder="Password"
              />
              <p className="text-[#ed6172] font-semibold px-2 text-start">
                {errors.password?.message}
              </p>
            </div>
            <p className="pt-4 pb-1 text-center text-gray-500">You don't have an account? </p>
            <p className="mb-2 text-center">
              <Link href="/register">
                <span className="font-semibold underline decoration-2 decoration-teal-600 cursor-pointer">
                  Sign Up Now!
                </span>
              </Link>
            </p>
            <div className="text-center">
              <button className="formButton mt-6" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
