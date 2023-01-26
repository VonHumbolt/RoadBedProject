import Header from "@/components/Header";
import AuthService from "@/services/authService";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

function Login() {
  const authService = new AuthService();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    authService.login(data).then((result) => {
      console.log(result.data);
    });
  };

  return (
    <div className="text-center">
      <Header />

      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto">
        <div className="absolute top-52">
          <h3 className="text-5xl text-center font-bold text-gray-600 py-4">
            Login
          </h3>

          <form
            className="p-2 w-fit sm:w-[400px] md:w-[500px] space-y-4 mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-3">
              <input
                {...register("email")}
                className="formInput"
                type="email"
                placeholder="Email"
              />
              <input
                {...register("password")}
                className="formInput"
                type="password"
                placeholder="Password"
              />
            </div>
            <p>
              You don't have an account?{" "}
              <Link href="/register">
                <span className="font-semibold underline decoration-teal-600 cursor-pointer">
                  Sign up now!
                </span>
              </Link>
            </p>
            <button
              className="formButton"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
