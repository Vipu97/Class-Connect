import React, { useState } from "react";

const Slide = ({ title, content, photo }) => {
  const [fullView, setFullView] = useState(false);
  return (
    <div className="flex flex-col mx-auto w-full py-5 rounded-xl h-full items-center px-4 cursor-pointer shadow-question gap-4 max-w-[1100px]">
      <div className="relative">
        {fullView ? (
          <div className="fixed inset-0 -z-0 flex items-center justify-center top-0">
          <img
            src={photo}
            alt="slide-photo"
            className="absolute w-full h-full object-contain aspect-auto rounded-xl -z-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#146affcc"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            className="absolute w-9 h-9 text-red-500 cursor-pointer top-36 xs:top-28 xsm:top-24 sm:top-16 sxl:top-12 xl:top-4 right-3 xl:right-32 z-10 hover:scale-110"
            onClick={() => setFullView(false)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        ) : (
          <>
            <img
              src={photo}
              alt="slide-photo"
              className={`w-full max-w-[700px] rounded-xl object-cover aspect-auto`}
              onClick={() => setFullView(true)}
            />
          </>
        )}
      </div>
      <div>
        <h1 className="text-[35px] font-bold">{title}</h1>
        <p className="text-wrap text-[18px]">{content}</p>
      </div>
    </div>
  );
};

export default Slide;
