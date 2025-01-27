import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PiListDashesBold, PiListDashes } from "react-icons/pi";
import { IoIosChatbubbles } from "react-icons/io";

const NavigationBar = () => {
  return (
    <>
      <header
        style={{ height: "10vh" }}
        className="top-0 w-full text-white flex flex-wrap z-{20} items-center justify-between px-5 md:px-10 lg:px-20 py-1 bg-purple-900"
      >
        <div className="logo flex gap-2">
          <NavLink to="/" className="text-md md:text-lg lg:text-2xl font-semibold">
            Chat ONN
          </NavLink>
          {/* Responsive Icon Sizes */}
          <IoIosChatbubbles size={22} className="block md:hidden" />
          <IoIosChatbubbles size={25} className="hidden md:block lg:hidden" />
          <IoIosChatbubbles size={30} className="hidden lg:block" />
        </div>
        <nav className="flex items-center gap-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7153/7153150.png"
            alt="User's-img"
            className="h-6 w-9 md:h-8 lg:w-11 lg:h-10 lg:w-13 object-cover"
          />
          <p className="text-sm md:text-md lg:text-lg">User's name</p>
        </nav>
      </header>
    </>
  );
};

export default NavigationBar;
