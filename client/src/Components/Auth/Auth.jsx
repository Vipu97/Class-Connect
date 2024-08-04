import React, { useRef, useState } from "react";
import Button from "../IndexPage/Button";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import handPhoneImg from "../../assets/svgs/handPhone.svg";

const Auth = () => {
  const [eventCode, setEventCode] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const inputRef = useRef();

  async function fetchData(eventCode) {
    try {
      const { data } = await axios.get(`/event/${eventCode}`);
      if (!data) throw error;
    } catch (error) {
      throw error;
    }
  }

  const handleJoinEvent = async () => {
    if (eventCode == "") {
      inputRef.current.focus();
      return toast({
        status: "error",
        title: "Event code is empty",
      });
    }
    toast.promise(fetchData(eventCode), {
      loading: {
        title: "Validating Event Code",
        description: "Please wait...",
      },
      success: {
        title: "Event Found",
        duration: "1000",
        onCloseComplete: () => navigate(`/event/submit/${eventCode}`),
      },
      error: {
        title: "Invalid Event Code",
        description: "No event currently exist for the given code",
      },
    });
  };
  return (
    <div className="h-96 bg-white md:w-[600px] lg:h-[100vh] mx-auto lg:mx-0">
      <div className="bg-[rgb(246, 247, 250)] flex flex-col items-center justify-center px-5 h-full">
        <div
          className="w-full bg-[#ffff] shadow-2xl py-8 px-3 text-center rounded-3xl 
            max-w-[350px] h-fit flex flex-col items-center justify-center lg:h-full lg:z-0 lg:max-w-[450px]
            lg:fixed lg:bottom-1 lg:rounded-md"
        >
          <h1 className="text-[#1d254f] text-[22px] font-black">
            Participate in an event
          </h1>
          <img src={handPhoneImg} alt="handphone-image" />
          <div
            className="flex gap-4 mt-6 py-2 px-3 max-w-[400px] mx-auto
          rounded-[30px] justify-center"
            style={{
              backgroundImage:
                "linear-gradient(to right, #F59E0B, #F59E0B, #F6E05E)",
            }}
          >
            <input
              type="text"
              placeholder="Event code"
              className="rounded-3xl h-[42px] px-4 outline-none border-gray border-2
                   focus:border-blue w-2/3 shrink"
              value={eventCode}
              onChange={(e) => setEventCode(e.target.value.toUpperCase())}
              ref={inputRef}
            />
            <Button
              text={"Join!"}
              classname={"px-4 rounded-[30px] py-0 font-extrabold"}
              onClick={handleJoinEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
