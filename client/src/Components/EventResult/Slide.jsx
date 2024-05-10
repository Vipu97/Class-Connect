import React from "react";

const Slide = ({ content, photo }) => {
  return (
    <div className="px-3 flex flex-col items-center justify-center">
      <div>
        <img
          src={photo}
          alt="slide-photo"
          className="w-full rounded-xl max-w-[700px] object-cover h-96"
        />
      </div>
      <pre className="text-[23px] text-wrap mt-3 leading-tight">{content}</pre>
    </div>
  );
};

export default Slide;
