import React from "react";
import { Link } from "react-router-dom";

const CreateQuestionFooter = ({ eventCode, handleSaveQuestion }) => {
  return (
    <div className="fixed bottom-0 py-2 px-8 z-10 bg-white border-t-2 border-gray-200 w-full">
      <div className="flex justify-between w-full">
        <Link
          to={`/event/${eventCode}`}
          className="font-black text-gray-600 hover:text-blue 
            py-2 px-5 rounded-3xl bg-white hover:bg-[#e0e8f2]"
        >
          Cancel
        </Link>
        <div className="flex gap-6">
          <button
            className="font-black py-2 px-6 border-2 border-[#5e94f1cc]
             bg-blue rounded-3xl hover:bg-gray-100 text-white hover:text-black"
            onClick={handleSaveQuestion}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionFooter;
