import React, { Suspense, useCallback, useEffect, useState, lazy } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../Components/HomePage/Layout";
import CustomSpinner from "../Components/CustomSpinner";
import { useUserContext } from "../Context/userContext";
import { useToast } from "@chakra-ui/react";
import NoEvents from "../Components/HomePage/NoEvents";

const EventsList = lazy(() => import("../Components/HomePage/EventsList"));

const HomePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventCode, setEventCode] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { user } = useUserContext();
  const userId = user?.id;
  const toast = useToast();

  const createNewEvent = async () => {
    try {
      const { data } = await axios.post("/event", { userId });
      const eventCode = data.eventCode;
      setEventCode(eventCode);
      navigate(`/event/${eventCode}`);
    } catch (err) {
      console.error(err.message);
    }
  };
  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`/event/${eventId}`);
      await axios.delete(`/question/event/${eventCode}`);
      setEvents(prevEvents => prevEvents.filter(event => event?.id !== eventId));
      toast({
        status: "success",
        title: "Event Deleted Successfully"
      })
      setRefresh(!refresh);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchEvents = useCallback(async () => {
    try {
      const { data } = await axios.get(`/event/user/${userId}`);
      setEvents(data);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }, [userId]);

  useEffect(() => {
    if (userId)
      fetchEvents();
  }, [userId, refresh])

  return (
    <div className="px-3 xs:px-8">
      <Layout />
      <div className="mt-6 flex flex-col">
        <div className="flex justify-right gap-4">
          <Link
            className="flex gap-2 
            rounded-3xl h-11 px-3 bg-blue text-white 
            font-extrabold hover:scale-105  ml-auto 
            items-center"
            to={"/meeting"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>
            <span> Create / Join Meeting</span>
          </Link>
        </div>
        <h1 className="font-black text-[23px] my-2.5 mt-5">
          My events ({events ? events?.length : 0})
        </h1>
        <button
          className="flex gap-1 rounded-3xl  py-2 px-3 bg-blue hover:scale-105 mr-auto"
          to={'/meeting'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-extrabold text-white" onClick={createNewEvent}>Create event</span>
        </button>
      </div>
      {(events.length === 0 && !loading) ? <NoEvents userName={user.name} createNewEvent={createNewEvent}
      /> :
        <Suspense fallback={<CustomSpinner />}>
          <EventsList events={events} deleteEvent={deleteEvent} />
        </Suspense>
      }
    </div>
  );
};

export default HomePage;
