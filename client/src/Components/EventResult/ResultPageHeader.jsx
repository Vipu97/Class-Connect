import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EventResultPage from "../../Pages/EventResultPage";
import axios from "axios";
import CustomSpinner from "../Loading/CustomSpinner";
import ParticipantsPage from "./ParticipantsPage";

const ResultPageHeader = () => {
  const { code } = useParams();
  const [subpage, setSubpage] = useState("questions");
  const [eventName, setEventName] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEventResponse = async () => {
      const { data } = await axios.get(`/event/${code}`)
      setEventName(data.name);
      setResponse(data.responses);
      setLoading(false);
    };
    fetchEventResponse();
  }, []);
  
  if(loading)
     return <CustomSpinner />
  return (
    <div className="px-4 py-12 sm:px-12 md:px-20">
      <Link
        className="font-bold py-1.5 px-2 pr-4 w-24 border-2 border-gray-300 rounded-3xl hover:bg-cyan-50 flex items-center gap-1"
        to={`/event/${code}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-black">Back</span>
      </Link>
      <header className="flex flex-col justify-center">
        <h1
          className="text-[55px] font-black text-center 
        text-[#1d254f]"
        >
          {eventName}
        </h1>
        <p className="text-center text-gray-600 font-bold">
          Number of Participants : {response.length}
        </p>
      </header>
      <div className="flex items-center gap-8 mt-16 font-black">
        <button
          className={`hover:text-blue border-2 py-2 border-white ${subpage === "questions" && "border-b-blue"}`}
          onClick={() => setSubpage("questions")}
        >
          Questions
        </button>
        <button
          className={`hover:text-blue border-2 py-2 border-white ${subpage === "participants" && "border-b-blue"}`}
          onClick={() => setSubpage("participants")}
        >
          Participants [{response.length}]
        </button>
      </div>
      {subpage === "questions" ? (
        <EventResultPage response={response} eventName={eventName} code={code}/>
      ) : (
        <ParticipantsPage response = {response} code = {code} />
      )}
    </div>
  );
};

export default ResultPageHeader;
