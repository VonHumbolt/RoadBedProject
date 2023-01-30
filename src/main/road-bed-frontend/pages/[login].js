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

  const { register, handleSubmit, formState:{errors} } = useForm();
  const onSubmit = (data) => {
    authService.login(data).then((result) => {
      dispatch(save(result.data))
    });
  };

  return (
    <div className="text-center">
      <Header />

      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto">
        <div className="absolute top-52">
          <h3 className="text-5xl text-center font-bold text-gray-600 py-4 mb-8">
            Login
          </h3>

          <form
            className="p-2 w-fit sm:w-[400px] md:w-[500px] space-y-4 mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-2">
              <input
                {...register("email", {required: "Please enter an email."})}
                className="formInput"
                type="email"
                placeholder="Email"
              />
              <p className="text-[#ed6172] font-semibold px-2 text-start">{errors.email?.message}</p>
              <input
                {...register("password", {required: "Please enter your password."})}
                className="formInput"
                type="password"
                placeholder="Password"
              />
              <p className="text-[#ed6172] font-semibold px-2 text-start">{errors.password?.message}</p>
            </div>
            <p className="py-2">
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
