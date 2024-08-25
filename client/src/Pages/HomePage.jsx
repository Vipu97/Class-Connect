import React, {useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../Components/HomePage/Layout";
import { useUserContext } from "../Context/userContext";
import { useToast } from "@chakra-ui/react";
import NoEvents from "../Components/HomePage/NoEvents";
import EventsList from "../Components/HomePage/EventsList";
import computerIcon from "../assets/svgs/computerIcon.svg";
import plusIcon from "../assets/svgs/plusIcon.svg";
import CustomSkeleton from "../Components/Loading/CustomSkeleton";

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
    } catch (err) {
      console.error(err.message);
    }finally{
      setLoading(false);
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
            <img src={computerIcon} alt="computer-icon" className="w-6 h-6"/>
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
          
          <img src={plusIcon} alt="plus-icon" className="w-6 h-6"/>
          <span className="font-extrabold text-white" onClick={createNewEvent}>Create event</span>
        </button>
      </div>
      {loading ? <CustomSkeleton /> :
        events.length === 0 ? <NoEvents userName={user?.name} createNewEvent={createNewEvent}
        /> :<EventsList events={events} deleteEvent={deleteEvent} />
      }
    </div>
  );
};

export default HomePage;
