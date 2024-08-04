import { useToast } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { createMeeting } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const LobbyButtons = ({setLoading}) => {
  const [meetingName, setMeetingName] = useState("");
  const [meetingCode, setMeetingCode] = useState("");
  const [inputNameMode, setInputModeName] = useState(false);
  const [inputCodeMode, setInputCodeName] = useState(false);
  const meetingNameRef = useRef(null);
  const meetingCodeRef = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleCreateMeeting = async () => {
    if(inputCodeMode)
       setInputCodeName(false)
    if (!inputNameMode) {
      setInputModeName(true);
      return;
    }
    if (!meetingName) {
      meetingNameRef.current.focus();
      return toast({
        title: "Meeting Name is required",
        status: "warning",
      });
    }
    setLoading(true);
    const meetingCode = await createMeeting();
    navigate(`/meeting/${meetingCode}`);
    setLoading(false);
  };

  const handleJoinMeeting = () => {
    if(inputNameMode)
        setInputModeName(false);
    if(!inputCodeMode){
        setInputCodeName(true);
        return;
    }
    if(!meetingCode){
        meetingCodeRef.current.focus();
        return toast({
            title : "Meeting Code is requred",
            status : "warning"
        })
    }
    navigate(`/meeting/${meetingCode}`);
  };
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className= {`flex flex-col items-center gap-4 ${inputNameMode && " mb-10"}`}>
        {inputNameMode && (
          <input
            type="text"
            placeholder="Enter a meeting name"
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
            className="bg-transparent outline-none text-white border-b-2 w-full max-w-80 focus:border-b-red-400"
            ref={meetingNameRef}
          />
        )}
        <button
          className="border-2 border-transparent rounded-xl 
      text-center py-2 w-80 max-w-96 bg-[#4f46e5] text-white 
      font-bold hover:scale-95"
          onClick={handleCreateMeeting}
        >
          Create Meeting
        </button>
      </div>
      <div className={`flex flex-col items-center gap-4 ${inputCodeMode &&
         " mt-10"}`}>
        {inputCodeMode && (
          <input
            type="text"
            placeholder="Enter meeting Code"
            className="bg-transparent outline-none text-white border-b-2 w-80 focus:border-b-red-400"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
            ref = {meetingCodeRef}
          />
        )}
        <button
          className="rounded-xl py-2.5 px-3 w-80  bg-[#374151]
       text-white font-extrabold hover:scale-95"
          onClick={handleJoinMeeting}
        >
          {" "}
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default LobbyButtons;
