import React from "react";
import CorrectIcon from "../../icons/CorrectIcon";

const McqOrPoll = ({option , votesPercentage , votes ,index}) => {
  return (
    <div key={index} className="h-12 flex gap-3 items-center justify-between">
      <div className="flex items-center">
        <div className="w-10">{option.isAnswer && <CorrectIcon />}</div>
        <h1 className="w-32">{option.input}</h1>
      </div>
      <div className="w-full max-w-[700px] grow flex justify-center">
        <div
          className={`flex justify-center 
         bg-blue rounded-3xl`}
          style={{ width: `calc(${votesPercentage}%)` }}
        >
          <p
            className={`font-extrabold text-[13px] text-center w-16 py-['2px'] ${
              votes === 0 ? "text-blue" : "text-white"
            }`}
          >
            {Math.round(votesPercentage)}%
          </p>
        </div>
      </div>
      <h1 className="w-32 text-right">{votes} Votes</h1>
    </div>
  );
};

export default McqOrPoll;
