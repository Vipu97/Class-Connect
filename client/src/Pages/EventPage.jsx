import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/HomePage/Layout";
import { Link } from "react-router-dom";
import { Tooltip, useToast } from "@chakra-ui/react";
import NoQuestion from "../Components/EventPage/NoQuestion";
import ResetEventModal from "../Components/EventPage/ResetEventModal";
import QuestionsModal from "../Components/EventPage/QuestionsModal";
import QuestionsList from "../Components/EventPage/QuestionsList";
import crossIcon from "../assets/svgs/crossIcon.svg";
import rightIcon from "../assets/svgs/rightIcon.svg";
import editIcon from "../assets/svgs/editIcon.svg";
import CustomSkeleton from "../Components/Loading/CustomSkeleton";

const EventPage = () => {
  const { code } = useParams();
  const [event, setEvent] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [eventName, setEventName] = useState("My new event");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const clipBoard = navigator.clipboard;
  const toast = useToast();

  const updateEventName = async () => {
    try {
      await axios.put("/event/eventName", {
        eventCode: code,
        newEventName: eventName,
      });
      setOpenEditModal(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteQuestion = async (questId) => {
    try {
      if (event.responses.length > 0) {
        return toast({
          status: "info",
          title: "Question can't be delete",
          description: "You can't delete questions which already have responses. You have to reset the event if you want to delete any question.",
          duration: 6000,
        })
      }
      await axios.delete(`/question/${questId}`);
      const { data } = await axios.get(`/question/code/${code}`);
      setQuestions(data);
      return toast({
        status: "success",
        title: "Question deleted successfully",
      })
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleResetEvent = async () => {
    try {
      await axios.delete(`/event/reset/${code}`);
      setRefresh(ref => !ref);
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchEventDetails = async () => {
    try {
      const { data } = await axios.get(`/event/${code}`);
      setEvent(data);
      setEventName(data.name);
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/question/code/${code}`);
      setQuestions(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEventDetails();
    fetchQuestions();
  }, [refresh]);

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
            <img src={crossIcon} alt="cross-icon" className="w-8 h-8 cursor-pointer hover:text-red-500"
              onClick={() => setOpenEditModal(false)} />
            <img src={rightIcon} alt="right-icon" className="w-8 h-8 cursor-pointer hover:text-blue"
              onClick={updateEventName} />
          </div>
        ) : (
          <div className="flex gap-3 items-center cursor-pointer">
            <h1 className="text-[20px] font-extrabold hover:text-gray-500">
              {eventName}
            </h1>
            <Tooltip label="Edit event name">
              <img src={editIcon} alt="edit-icon" className="w-5 h-5  hover:text-blue transition-all"
                onClick={() => setOpenEditModal(true)} />
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
          {!isCopied ? 
          <Tooltip label="copy link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              onClick={() => {
                clipBoard.writeText(`${import.meta.env.VITE_DOMAIN}/event/submit/${code}`)
                setIsCopied(true)
              }}
              className={`w-6 h-6 cursor-pointer`}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              />

            </svg>
          </Tooltip> : 
          <Tooltip label="link copied">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="blue"
              className={`w-7 h-7 cursor-wait`}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              />

            </svg>
          </Tooltip>
          }
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
            <ResetEventModal handleResetEvent={handleResetEvent} />
            <Link
              className="bg-blue py-2 px-3 xs:px-5 rounded-3xl
           text-white font-extrabold hover:scale-105"
              to={`/ event / ${code} /result`}
            >
              Check Results
            </Link>
          </div>
        </div>
      )}
      <QuestionsModal eventId={event._id} code={code} event={event} />
      {loading ? <CustomSkeleton /> :
        questions.length === 0 ? <NoQuestion /> :
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
