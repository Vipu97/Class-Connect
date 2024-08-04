import React from "react";
import Typewriter from "typewriter-effect";
import Button from "./Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="mt-9 px-3 mx-2 xs:mx-5 flex flex-col gap-8 items-center">
      <h1
        className="text-[40px] font-[900] text-[#1d254f] text-center xs:text-[54px] mx-auto
        max-w-[720px] h-[250px] xs:h-[350px] sm:h-fit"
      >
        Interactive presentations
        <span className="flex justify-center items-center flex-wrap">
          {" "}
          for memorable
          <span className="text-blue ml-5">
            <Typewriter
              options={{
                strings: [
                  "<span> trainings </span>",
                  "<span> meetings </span>",
                  "<span> classes </span>",
                ],
                loop: true,
                autoStart: true,
                deleteSpeed: 35,
                delay: 55,
                cursor: "",
                pauseFor: 500,
              }}
            />
          </span>
        </span>
      </h1>
      <p className="text-center w-full text-2xl font-semibold text-gray-500 max-w-[720px] mx-auto">
        Wooclap, the tool to interact, capture attention and measure
        understanding.
      </p>
      <Link to={"/register"} >
        <Button
          text={"Try Wooclap for free"}
          classname={"py-2.5 px-5 w-full font-extrabold sm:w-fit"}
        />
      </Link>
    </div>
  );
};

export default Hero;
