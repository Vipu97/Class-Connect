import { useToast } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const QuestionsList = ({ questions , deleteQuestion , event}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const handleEditQuestion = (questId,questType) => {
    if(event.responses.length > 0){
      return toast({
        status : "error",
        title : "Question can't be edited",
        description : "You can not edit a question which already has responses.You need to reset your event result to edit a question"
      })
    }
    else
      navigate(`/event/edit/${questId}/${questType}`);
  }
  return (
    <div className="flex flex-col mt-10">
      {questions?.map((quest, index) => {
        return (
          <div key={index} className="flex justify-between cursor-pointer hover:bg-[#bfdbfe] py-2 rounded-sm border-y-[1px] flex-col gap-y-0 xs:gap-y-2 xs:flex-row md:px-6">
            <div className="flex gap-2 items-center text-[15px] shrink w-full">
              <img src={`/${quest.type}.svg`} alt="type" width={20}/>
              <span className="text-14px ml-1">{index + 1}.</span>
              <p className="font-medium text-gray-600 text-wrap 
               max-w-full">
                {quest.question}</p>
            </div>
            <div className="flex text-[15px] justify-end xs:justify-start items-center gap-8 xs:gap-0 sm:gap-4 shrink-0">
                <button className="h-[35px] py-1.5 px-4 font-black text-gray-500bg-transparent hover:text-blue 
                rounded-3xl hover:bg-white" 
                onClick={() => handleEditQuestion(quest._id , quest.type)}
                 >Edit</button>
                <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-6 hover:text-red-500 cursor-pointer hover:scale-125 relative sm:top-[-1px] xs:left-2"
                  onClick={() => deleteQuestion(quest._id)}
                 
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsList;
