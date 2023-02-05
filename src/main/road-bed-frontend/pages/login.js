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
    <div className="">
      <Header />
      <div className="relative text-center flex flex-col bg-gray-100 items-center h-screen">
        <img
          className="opacity-70 w-full sm:max-h-96 min-h-[400px]"
          src="https://img.freepik.com/premium-photo/lower-manhattan-from-brooklyn_155769-2248.jpg?w=1380"
        />

        <div className="absolute top-52 mx-auto z-20 max-w-7xl">
          <div className="bg-white z-20 pt-10 pb-10 px-16 rounded-2xl shadow-xl">
            <div className="">
              <h3 className="text-3xl text-center font-bold text-gray-600 py-4 mb-5">
                Login
              </h3>

              <form className="mx-auto px-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-2">
                  <input
                    {...register("email", {
                      required: "Please enter an email.",
                    })}
                    className="formInput"
                    type="email"
                    placeholder="Email"
                  />
                  <p className="text-[#ed6172] font-semibold px-2 text-start">
                    {errors.email?.message}
                  </p>
                  <input
                    {...register("password", {
                      required: "Please enter your password.",
                    })}
                    className="formInput mx-auto"
                    type="password"
                    placeholder="Password"
                  />
                  <p className="text-[#ed6172] font-semibold px-2 text-start">
                    {errors.password?.message}
                  </p>
                </div>
                <p className="pt-4 pb-1 ">You don't have an account? </p>
                <p className="mb-2">
                  <Link href="/register">
                    <span className="font-semibold underline decoration-teal-600 cursor-pointer">
                      Sign Up Now!
                    </span>
                  </Link>
                </p>
                <button className="formButton mt-6" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
