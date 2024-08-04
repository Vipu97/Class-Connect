import React from "react";
import DeleteQuestionMenu from "./DeleteQuestionMenu";
import EditQuestionModal from "./EditQuestionModal";
import {createIconsMap} from "../../utils/helper";

const iconsMap = createIconsMap();

const QuestionsList = ({ questions , deleteQuestion , event}) => {
  return (
    <div className="flex flex-col mt-10">
      {questions?.map((quest, index) => {
        return (
          <div key={index} className="flex justify-between cursor-pointer hover:bg-[#bfdbfe] py-2 rounded-sm border-y-[1px] flex-col gap-y-0 xs:gap-y-2 xs:flex-row md:px-6">
            <div className="flex gap-2 items-center text-[15px] shrink w-full">
              <img src={iconsMap.get(quest.type)} alt="ques-type" width={20}/>
              <span className="text-14px ml-1">{index + 1}.</span>
              <p className="font-medium text-gray-600 text-wrap 
               max-w-full">
                {quest.question}</p>
            </div>
            <div className="flex text-[15px] justify-end xs:justify-start items-center gap-8 xs:gap-0 sm:gap-4 shrink-0">
                 <EditQuestionModal questId={quest._id} questType = {quest.type} event={event}/>
                <button>
                  <DeleteQuestionMenu questId={quest._id} deleteQuestion={deleteQuestion} />
                </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsList;
