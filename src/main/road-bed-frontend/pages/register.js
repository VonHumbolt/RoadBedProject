import Header from "@/components/Header";
import AuthService from "@/services/authService";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

function Register() {

  const authService = new AuthService();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    authService.register(data).then(result => console.log(result.data))
  };

  return (
    <div className="relative">
      <Header />

      <div className="flex flex-col max-w-7xl mx-auto items-center justify-center">
        <div className="absolute top-52">
          
          <h3 className="text-4xl font-bold text-gray-600 pt-4 pb-6 text-center">
            Create an Account
          </h3>

          <form
            className="w-fit sm:w-[400px] mt-5 mx-auto text-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-3">
              <input
                {...register("fullName")}
                className="formInput z-10"
                type="text"
                placeholder="Full Name"
              />
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
            <p className="text-center py-5">
              Already have an account?{" "}
              <Link href="/login">
                <span className="font-semibold underline decoration-teal-600 cursor-pointer">
                  Login!
                </span>
              </Link>
            </p>
            <button className="formButton" type="submit">
              Register
            </button>
          </form>
        
        </div>

      </div>
    </div>
  );
}

export default Register;
