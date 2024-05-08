import React from "react";
import { Link } from "react-router-dom";

const options = {
  day: "numeric",
  month: "short",
  year: "numeric",
};
const formattedDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", options);
};

const EventsList = ({ events, deleteEvent }) => {
  return (
    <div className="flex flex-col mt-10">
      {events?.map((event, index) => {
        return (
          <div className={`flex items-center border-t-[1px] ${index === events.length-1 && " border-b-[1px]"} hover:bg-[#bfdbfe] ${(index > 0 && index < events.length-1) && 'border-t-0'} `} key={index}>
            <Link
              className="flex flex-col py-3 xs:px-3 cursor-pointer
              justify-between w-full sm:flex-row"
              key={index}
              to={`/event/${event.eventCode}`}
            >
              {/* left-part */}
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-5 relative bottom-0.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                <h1 className="font-bold text-[18px]">{event.name}</h1>
              </div>
              {/* right part */}
              <div className="flex gap-7 text-gray-500 items-center">
                <h2>[{event.eventCode}]</h2>
                <h2>{formattedDate(event.date)}</h2>
              </div>
            </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-6 hover:text-red-500 cursor-pointer hover:scale-125 relative top-3  md:mx-8 sm:top-[-1px]"
                  onClick={() => deleteEvent(event._id)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
          </div>
        );
      })}
    </div>
  );
};

export default EventsList;
