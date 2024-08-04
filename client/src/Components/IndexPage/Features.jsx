import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import featuresImg from "../../assets/pngs/features-image.png";

const Features = () => {
  return (
    <div
      className="flex w-[90%] mt-24 gap-x-12 items-center bg-featuresBg max-w-[1200px] mx-auto py-8
    px-8 md:pl-28 lg:pl-20 mb-36"
    >
      {/* left-part */}
      <div className="flex flex-col gap-5 max-w-[600px] justify-center items-center lg:items-start">
        <h1
          className="text-[27px] font-[900] text-[#1d254f] text-center xs:text-[43px] md:w-[400px] 
          lg:w-[600px] md:text-left "
        >
          Create memorable learning experiences with{" "}
          <span className="text-blue">wooclap</span>
        </h1>
        <span className="text-gray-600 text-lg text-center md:text-left">
          Register for free and create your first questions.
        </span>
        <Link to={"/register"} >
          <Button
            text={"Try Wooclap for free"}
            classname={"mt-7 md:w-[210px] font-black py-2.5 px-4"}
          />
        </Link>
      </div>
      <img
        src={featuresImg}
        alt="features-image"
        className="hidden lg:inline-block"
      />
    </div>
  );
};

export default Features;
