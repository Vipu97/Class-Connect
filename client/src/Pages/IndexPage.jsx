import React, { useState } from "react";
import Hero from "../Components/IndexPage/Hero";
import Button from "../Components/Button";
import Header from "../Components/Header";
import Features from "../Components/IndexPage/Features";
import {useToast} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const [eventCode, setEventCode] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const handleClick = async() => {
    if(eventCode === ""){
      toast({
        title : "Event Code is empty",
        status : 'error'
      })
      return;
    }
    const {data} = await axios.get(`/event/${eventCode}`);
    if(!data){
      toast({
        title : "Invalid Event Code",
        description : "No event currently exist for the given code",
        status : 'error'
      })
      return;
    }
    navigate(`/event/submit/${eventCode}`);
  }
  return (
    <>
    <Header />
    <div className="w-full">
      <div className="w-full mx-auto flex flex-col gap-y-4 justify-between p-4 mt-6 items-center sm:flex-row max-w-[768px]
        md:rounded-[40px] md:px-8 overflow-hidden md:h-20" 
        style={{backgroundImage: 'linear-gradient(to right, #F59E0B, #F59E0B, #F6E05E)'}}>
        <div className="flex items-center">
          <img src="/handPhone.svg" alt="hand-image" width={'120px'} 
          className="relative top-1 object-contain hidden md:inline"/>
          <p className="text-xl min-w-64 text-center sm:text-left font-medium">
            Join an event
          </p>
        </div>
        <div className="w-full flex justify-between gap-4 xs:gap-8">
          <input
            type="text"
            placeholder="Event code"
            className="rounded-3xl h-[45px] px-4 outline-none border-white border-2 focus:border-[#000000] 
            w-64 grow"
            value={eventCode}
            onChange={(e) => setEventCode(e.target.value.toUpperCase())}
          />
          <Button text={"Go!"} classname={"px-2.5 rounded-[50%]"} onClick = {handleClick}/>
        </div>
      </div>
      
      <Hero />
      <Features />
    </div>
    </>
  );
};

export default IndexPage;
