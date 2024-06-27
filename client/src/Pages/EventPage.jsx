import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/HomePage/Layout";
import QuestionsModal from "../Components/EventPage/QuestionsModal";
import QuestionsList from "../Components/EventPage/QuestionsList";
import CustomSpinner from "../Components/CustomSpinner";
import { Link } from "react-router-dom";
import { Tooltip, useToast } from "@chakra-ui/react";
import NoQuestion from "../Components/EventPage/NoQuestion";

const EventPage = () => {
  const { code } = useParams();
  const [event, setEvent] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [eventName, setEventName] = useState("My new event");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const clipBoard = navigator.clipboard;
  const toast = useToast();

  const updateEventName = async () => {
    await axios.put("/event/eventName", {
      eventCode: code,
      newEventName: eventName,
    });
    setOpenEditModal(false);
  };

  const deleteQuestion = async (questId) => {
    await axios.delete(`/question/${questId}`);
    const { data } = await axios.get(`/question/code/${code}`);
    setQuestions(data);
    return toast({
      status: "success",
      title: "Question deleted successfully",
    })
  };

  const handleResetButton = async () => {
    await axios.delete(`/event/reset/${code}`);
    setRefresh(ref => !ref);
  };
  const fetchEventDetails = async () => {
    setLoading(true);
    const { data } = await axios.get(`/event/${code}`);
    setEvent(data);
    setEventName(data.name);
    setLoading(false);
  };
  const fetchQuestions = async () => {
    setLoading(true);
    const { data } = await axios.get(`/question/code/${code}`);
    setQuestions(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchEventDetails();
    fetchQuestions();
  }, [refresh]);

  if (loading) return <CustomSpinner />;
  return (
    <div className="px-4 sm:px-8">
      <Layout />
      <div className="flex flex-col md:flex-row md:justify-between mt-5 gap-y-2">
        {openEditModal ? (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="border-[1px] py-2 px-3 border-gray-300 rounded-md w-64 xs:w-96"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer hover:text-red-500"
              onClick={() => setOpenEditModal(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer hover:text-blue"
              onClick={updateEventName}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        ) : (
          <div className="flex gap-3 items-center cursor-pointer">
            <h1 className="text-[20px] font-extrabold hover:text-gray-500">
              {eventName}
            </h1>
            <Tooltip label="Edit event name">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5  hover:text-blue transition-all"
                onClick={() => setOpenEditModal(true)}
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </Tooltip>
          </div>
        )}
        {/* right side */}
        <div className="flex gap-2 text-[15px] items-center font-semibold overflow-hidden">
          <span>Participate at : </span>
          <input
            type="text"
            className="border-[1px] py-1 px-2 w-36 xs:w-48 text-nowrap"
            value={`${import.meta.env.VITE_DOMAIN}/event/submit/${code}`}
            readOnly
          />
          <Tooltip label="copy link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer hover:text-blue"
              onClick={() =>
                clipBoard.writeText(`${import.meta.env.VITE_DOMAIN}/event/submit/${code}`)
              }
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              />
            </svg>
          </Tooltip>
        </div>
      </div>
      {event.responses?.length > 0 && (
        <div className="mt-5 bg-[#ecf0f7] py-3 px-5 rounded-2xl flex flex-col">
          <h1 className="font-extrabold">Your event has results.</h1>
          <h1 className="text-gray-600">
            Check the results or reset the event to present it to a new
            audience.
          </h1>
          <div className="ml-auto mt-2 flex gap-3">
            <button
              className="bg-white py-2 px-3 xs:px-5 rounded-3xl font-extrabold hover:bg-[#f2f5f7] hover:scale-105"
              onClick={handleResetButton}
            >
              Reset Event
            </button>
            <Link
              className="bg-blue py-2 px-3 xs:px-5 rounded-3xl
           text-white font-extrabold hover:scale-105"
              to={`/event/${code}/result`}
            >
              Check Results
            </Link>
          </div>
        </div>
      )}
      <QuestionsModal eventId={event._id} code={code} event={event} />
      {questions.length === 0 ? <NoQuestion /> :
        <QuestionsList
          questions={questions}
          code={code}
          deleteQuestion={deleteQuestion}
          event={event}
        />
      }
    </div>
  );
};

export default EventPage;
