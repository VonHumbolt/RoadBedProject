import Header from "@/components/Header";
import AuthService from "@/services/authService";
import Image from "next/image";
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
    <div className="relative h-screen">
      <Header />

      <div className="mx-auto items-center justify-center h-fit">
        <div className="flex flex-row h-fit">
          <div className="w-1/2 h-fit">
            <Image
              className="object-contain opacity-70"
              src="https://img.freepik.com/free-photo/hong-kong-august-8-scene-victoria-harbour-august-8_1203-3572.jpg?w=826&t=st=1675526268~exp=1675526868~hmac=0b311e3aa83639a7d148f33b5605a45f21310fd23a846a6bbee8c9e6d45ef136"
              width={1400}
              height={900}
              alt=""
            />
          </div>
          <div className="w-1/2">
            <Image
              className=" object-contain opacity-70"
              src="https://img.freepik.com/free-photo/skyscrapers-looking-up-sky-modern-metropolis-modern-city_231208-7550.jpg?w=826&t=st=1675525974~exp=1675526574~hmac=f16043ac3b14cfb0c6afa1a32ed25ba1a7d3f695395819248563bd3d30d43b50"
              width={1400}
              height={900}
              alt=""
            />
          </div>

          <div className="absolute top-52 left-1/3 bg-white p-10 rounded-2xl shadow-2xl">
            
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
    </div>
  );
}

export default Register;
