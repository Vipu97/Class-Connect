import React, {useState } from "react";

const SortableList = React.memo(({ options, response, setResponse, idx }) => {
  const [listItems, setListItems] = useState(options);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveResponse = () => {
    const updatedResponse = [...response];
    updatedResponse[idx].answers = [...listItems];
    setResponse(updatedResponse);
    setIsSaved(true);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const updatedListItems = [...listItems];
      const temp = updatedListItems[index];
      updatedListItems[index] = updatedListItems[index - 1];
      updatedListItems[index - 1] = temp;
      setListItems(updatedListItems);
      setIsSaved(false);
    }
  };

  const handleMoveDown = (index) => {
    if (index < listItems.length - 1) {
      const updatedListItems = [...listItems];
      const temp = updatedListItems[index];
      updatedListItems[index] = updatedListItems[index + 1];
      updatedListItems[index + 1] = temp;
      setListItems(updatedListItems);
      setIsSaved(false);
    }
  };


  return (
    <>
      <ul className="flex flex-col gap-4 w-full max-w-[600px] mx-auto xs:gap-5">
        {listItems.map((item, index) => (
          <li
            key={index}
            className="mx-auto w-full py-2 rounded-xl flex items-center justify-between px-4 cursor-pointer shadow-question min-h-12 xs:min-h-16"
          >
            {item.input}
            <div className="flex gap-5">
              <button
                className={"text-[#686565] hover:text-blue hover:scale-110"}
                onClick={() => handleMoveUp(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                  />
                </svg>
              </button>
              <button
                className={"text-[#686565] hover:text-blue hover:scale-110"}
                onClick={() => handleMoveDown(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#686565"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
        <div className="flex justify-end">
          <button
            className={`bg-[#4082f5] px-2 py-1.5 rounded-3xl mt-[-10px]
           text-white font-extrabold w-24 cursor-pointer border-none hover:scale-105 ${
             isSaved ? " bg-[#b4cef6] cursor-not-allowed" : ""
           }`}
            onClick={handleSaveResponse}
            disabled={isSaved}
          >
            Save
          </button>
        </div>
      </ul>
    </>
  );
});

export default SortableList;
