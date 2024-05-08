import React, { useState } from "react";
import {useToast} from '@chakra-ui/react';

const PollOrMcq = ({index,options,response,setResponse}) => {
  const [isSaved,setIsSaved] = useState(false);
  const [selected,setSelected] = useState(null);
  const toast = useToast();

  const handleSaveResponse = () => {
    if(selected === null){
      return toast({
        status : "error",
        title : "Please select a option first"
      })
    }
    const updatedResponse = [...response];
    updatedResponse[index].answers = options[selected].input;
    setResponse(updatedResponse);
    setIsSaved(true);
  }
  const onSelectOption = (idx) => {
    if(idx === selected)
       setSelected(null);
    else
       setSelected(idx);
    setIsSaved(false);
  }
  return (
    <div className="flex flex-col justify-center gap-4 px-5 w-full max-w-[600px] xs:gap-5 mx-auto">
      {options.map((option, index) => {
        let optionsClassNames =
          "mx-auto w-full py-2 min-h-12 rounded-xl flex items-center px-6 cursor-pointer shadow-question hover:scale-105 xs:min-h-16";
          if(selected === index)
            optionsClassNames += " bg-blue";
        return (
          <div
            className={optionsClassNames}
            key={index}
            onClick={() => onSelectOption(index)}
          >
            <h1 className="font-medium">{option.input}</h1>
          </div>
        );
      })}
       <div className="flex justify-end">
        <button
          className={`bg-[#4082f5] px-3 py-1.5 rounded-3xl mt-[-10px]
           text-white font-extrabold w-24 cursor-pointer border-none hover:scale-105 ${isSaved ? " bg-[#b4cef6] cursor-not-allowed" : ""}`}
          onClick={handleSaveResponse}
          disabled={isSaved}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PollOrMcq;
