import Header from "@/components/Header";
import { save } from "@/redux/userSlice";
import AuthService from "@/services/authService";
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
    <div className="relative h-screen text-center flex flex-col bg-gray-100">
      <Header />

      <img
        className="opacity-70 max-h-96"
        src="https://img.freepik.com/premium-photo/lower-manhattan-from-brooklyn_155769-2248.jpg?w=1380"
      />

      <div className="absolute top-52 left-1/3 z-20 max-w-7xl">
        <div className="bg-white z-20 p-5 rounded-2xl">
          <div className=" h-[400px]">
            <h3 className="text-3xl text-center font-bold text-gray-600 py-4 mb-8">
              Login
            </h3>

            <form
              className="space-y-4 mx-auto px-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col space-y-2">
                <input
                  {...register("email", { required: "Please enter an email." })}
                  className="formInput mx-auto"
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
              <p className="py-2">
                You don't have an account?{" "}
                <Link href="/register">
                  <span className="font-semibold underline decoration-teal-600 cursor-pointer">
                    Sign up now!
                  </span>
                </Link>
              </p>
              <button className="formButton" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <img
        className="opacity-70 z-0 h-max-96"
        src="https://img.freepik.com/free-photo/elegant-circle-frame_53876-90186.jpg?w=1800&t=st=1675433461~exp=1675434061~hmac=94ae4aaa56c10b0d7ba46cbf43bfd13cac9a334b5cb2e3bdb42c8e983a084e06"
      />
    </div>
  );
}

export default Login;
