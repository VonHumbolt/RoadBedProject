import Header from "@/components/Header";
import AuthService from "@/services/authService";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

function Register() {

  const authService = new AuthService();

  const { register, handleSubmit,formState:{errors} } = useForm();
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
            <div className="flex flex-col space-y-2">
              <input
                {...register("fullName", {required: "Please enter your name."})}
                className="formInput z-10"
                type="text"
                placeholder="Full Name"
              />
              <p className="text-[#ED6172] font-semibold px-2 text-start">{errors.fullName?.message}</p>
              <input
                {...register("email", {required: "Please enter an email."})}
                className="formInput"
                type="email"
                placeholder="Email"
              />
              <p className="text-[#ED6172] font-semibold px-2 text-start">{errors.email?.message}</p>
              <input
                {...register("password", {required: "Please enter password."})}
                className="formInput"
                type="password"
                placeholder="Password"
              />
              <p className="text-[#ED6172] font-semibold px-2 text-start">{errors.password?.message}</p>

            </div>
            <p className="text-center py-5 my-2">
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
