import React from "react";

const McqOption = ({option,index,handleCheckBoxChange,handleInputChange,deleteOption}) => {
  return(
    <div className="flex items-center gap-3" key={index}>
      <div className="w-full max-w-[900px]">
        <input
          type="text"
          placeholder={index < 2 ? (index === 0 ? "Mumbai" : "Karachi") : ""}
          className="w-full py-2 pl-12 outline-none border-[1px] border-gray-300 rounded-md"
          value={option.input}
          onChange={(e) => handleInputChange(index , e.target.value)}
        />
        <input
          type="checkbox"
          className="h-[18px] w-[20px] rounded-sm cursor-pointer relative bottom-8 left-3"
          onChange={(e) => handleCheckBoxChange(index , e.target.checked)}
          checked={option.isAnswer}
        />
      </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 hover:text-red-500 cursor-pointer relative bottom-3"
          onClick={() => deleteOption(index)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
    </div>
  )
};

export default McqOption;
