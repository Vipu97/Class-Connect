import React from "react";

const Open = ({ ans, index }) => {
  return (
    <div key={index} className="py-1.5 px-3 bg-[#dbe6f8cc] rounded-xl">
      <p className="font-medium">{ans}</p>
    </div>
  );
};

export default Open;
