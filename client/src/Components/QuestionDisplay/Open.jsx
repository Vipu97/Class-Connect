import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";

const Open = ({response, setResponse,index }) => {
  const [isSaved,setIsSaved] = useState(false);
  const [input,setInput] = useState("");
  const toast = useToast();

  const handleSaveResponse = () => {
    if(input === ""){
      return toast({
        status : "error",
        title : "answer can't be empty"
      })
    }
    let updatedResponse = [...response];
    updatedResponse[index].answers = input;
    setResponse(updatedResponse);
    setIsSaved(true);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsSaved(false);
  }
  return (
    <div className="w-full max-w-[700px] mx-auto">
      <textarea
        rows={3}
        className="w-full py-2.5 px-3 border-[1.5px] focus:border-blue rounded-xl focus:border-[1px] my-2"
        placeholder="Your answer can be subjective..."
        value={input}
        onChange={(e) => handleInputChange(e)}
      ></textarea>
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

export default Open;
