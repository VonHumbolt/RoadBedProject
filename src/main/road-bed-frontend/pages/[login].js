import Header from "@/components/Header";
import AuthService from "@/services/authService";
import React, { useState } from "react";

function Login() {
  const authService = new AuthService();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    let loginRequest = {
      email: email,
      password: password,
    };

    authService.login(loginRequest).then(result => console.log(result.data))
  };

  return (
    <div className="text-center">
      <Header />

      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto">
        <div className="absolute top-52">
          <h3 className="text-5xl text-center font-bold text-gray-600 py-4">
            Login
          </h3>

          <form className="p-2 w-[400px] md:w-[500px] space-y-4 mx-auto">
            <div className="flex flex-col space-y-3">
              <input
                className="formInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <input
                className="formInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </div>

            <button
              className="px-10 md:px-20 rounded-md text-md font-semibold py-2 bg-teal-400"
              onClick={(e) => login(e)}
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
