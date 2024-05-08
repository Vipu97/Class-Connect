import React, { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Header = () => {
  const [dropdown, setDopDown] = useState(false);
  return (
    <>
      <div className="flex justify-between px-6 py-4 items-center xs:px-8 sm:px-10 md:px-16 lg:px-24 mb-3">
        <h2 className="logo text-blue font-black text-[32px]">wooclap</h2>
        <div className="right-side">
          <svg
            stroke="currentColor"
            fill="rgb(20, 106, 255,0.8)"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 cursor-pointer sm:hidden"
            onClick={() => setDopDown(!dropdown)}
          >
            <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
          </svg>
          <div className="items-center gap-6 hidden sm:flex">
            <Link to={"/login"}
              className="py-2 w-28 text-black font-bold border-2 border-gray-300 rounded-3xl 
            hover:border-2 hover:border-black text-center"
            >
              Login
            </Link>
            <Link to={"/register"}>
            <Button text={"Sign Up"} classname={"w-28 py-2"} />
            </Link>
          </div>
        </div>
      </div>
      {dropdown && (
        <div
          className="flex flex-col justify-center items-center border-t border-y-gray-300 gap-4 px-8
       pt-5 mt-1 mb-7"
        >
          <Link to={"/login"} className="w-full border-gray-300 py-2 rounded-full font-bold border-2
         hover:border-black max-w-[450px] text-center">
            <button>Login</button>
          </Link>
          <Link to={"/register"} className="w-full mx-auto max-w-[450px] py-2">
            <Button text={"Sign Up"} classname={"w-full max-w-[450px] py-2"} />
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
