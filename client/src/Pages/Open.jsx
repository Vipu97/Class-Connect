import React, { useCallback, useEffect, useRef, useState } from "react";
import BackButton from "../Components/CreateQuestion/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import CreateQuestionFooter from "../Components/CreateQuestion/CreateQuestionFooter";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Open = () => {
  const { code, questId } = useParams();
  const editMode = questId ? true : false;
  const [eventCode, setEventCode] = useState(code || "");
  const [question, setQuestion] = useState("");
  const questionRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSaveQuestion = async () => {
    if (!question) {
      questionRef.current.focus();
      return toast({
        status: "error",
        title: "Question can't be empty",
      });
    }
    if(editMode){
      const {data} = await axios.put("question" , {id:questId , question , eventCode});
      console.log(data);
    }
    else{
      await axios.post("/question", {
        question,
        eventCode,
        type: "open",
      });
    }
    navigate(`/event/${eventCode}`);
  };
  const fetchQuestionDetails = useCallback(async () => {
    const {data} = await axios.get(`/question/${questId}`);
    setQuestion(data.question);
    setEventCode(data.eventCode);
  },[questId,eventCode]);

  useEffect(() => {
    if(editMode)
      fetchQuestionDetails();
  },[questId]);

  return (
    <div className="py-6 flex flex-col gap-6">
      <BackButton eventCode={eventCode} />
      <div className="px-6">
        <h1 className="text-[25px] font-bold">Create an Open Question</h1>
        <p className="mt-[-5px]">
          Enter the question you want to ask your audience
        </p>
        <textarea
          rows={2}
          placeholder="Example : Descibe the role of unbiased  media in the development of a country?"
          className="w-full py-2.5 px-3 max-w-[1000px] border-[1.5px] focus:border-blue rounded-xl focus:border-[1px] my-2 
          resize-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          ref={questionRef}
        />
      </div>
      <CreateQuestionFooter
        eventCode={eventCode}
        handleSaveQuestion={handleSaveQuestion}
      />
    </div>
  );
};

export default Open;
