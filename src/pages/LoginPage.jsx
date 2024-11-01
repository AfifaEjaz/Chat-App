import React, { useState } from "react";
import Lottie from "lottie-react";
import animation from "../assets/LoginAnimation.json";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { username, password };
    console.log(payload);

    // Reset form fields
    setUsername("");
    setPassword("");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-1/2">
        <div className="w-full flex justify-center items-center">
          <Lottie
            loop={true}
            animationData={animation}
            className="lg:w-3/6 sm:w-full text-center"
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="email"
            name="email"
            aria-label="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="form-input w-4/5 p-2 border rounded-lg mb-3"
          />
          <input
            type="password"
            name="password"
            aria-label="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input w-4/5 p-2 border rounded-lg mb-3"
          />
          <button
            type="submit"
            className="bg-purple-900 text-white w-4/5 px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
