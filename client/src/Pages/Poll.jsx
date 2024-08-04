import React, { useEffect, useRef, useState } from "react";
import BackButton from "../Components/CreateQuestion/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import CreateQuestionFooter from "../Components/CreateQuestion/CreateQuestionFooter";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import deleteIcon from "../assets/svgs/deleteIcon.svg";

const Poll = () => {
  const { code,questId } = useParams();
  const [eventCode,setEventCode] = useState(code || "");
  const editMode = questId ? true : false;
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ input: "" }, { input: "" }]);
  const toast = useToast();
  const inputRef = useRef();
  const navigate = useNavigate();
 
  const deleteOption = (index) => { 
    if(options.length === 1)
      return;
    const newOptions = [...options];
    newOptions.splice(index,1);
    setOptions(newOptions);
  }
  const handleInputChange = (index,value) => {
    const newOptions = [...options];
    newOptions[index].input = value;
    setOptions(newOptions);
  }
  const handleSaveQuestion =async() => {
    if(question === ""){
      inputRef.current.focus();
      toast({
        title : "Question can't be empty",
        status : 'error',
      })
      return;
    }
    for (let i of options) {
      if (i.input === "") {
        toast({
          title: "Options can't be empty",
          description: "You can delete the option if you want",
          status: "error",
        });
        return;
      }
    }
    if(editMode){
      axios.put('/question',{id:questId ,question , eventCode,
        type : 'poll' , options})
    }else{
      await axios.post('/question',{question,eventCode,type:'poll',options});
    }
    navigate(`/event/${eventCode}`);
  }

  useEffect(() => {
    const fetchQuestionDetails = async() => {
      const {data} = await axios.get(`/question/${questId}`);
      setQuestion(data.question);
      setOptions(data.options);
      setEventCode(data.eventCode);
    }
    if(editMode)
      fetchQuestionDetails();
  },[])
  return (
    <div className="py-6 flex flex-col gap-6">
      <BackButton eventCode={eventCode} />
      <div className="px-6">
        <h1 className="text-[25px] font-bold">
          Create a Multiple Choice Question
        </h1>
        <p className="mt-[-5px]">
          Enter the question you want to ask your audience
        </p>
        <textarea
          rows={2}
          placeholder="Example : Do you think protest should be legal in a democratic country?"
          className="w-full py-2.5 px-3 max-w-[1000px] border-[1px]
           focus:outline-blue rounded-xl
          focus:outline-[1px] my-2 resize-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          ref={inputRef}
        />
      </div>
      <div className="mt-3 px-6">
        <h1 className="text-[25px] font-bold">Answers</h1>
        <p className="mt-[-5px]">
          Enter the answers your audience can vote for
        </p>
        <div className="flex flex-col my-5 gap-5">
          {options.map((option, index) => {
            return (
              <div className="flex items-center gap-4" key={index}>
                <input
                  type="text"
                  placeholder={
                    index < 2 ? (index === 0 ? "Yes" : "No") : ""
                  }
                  className="w-full py-2 px-4 outline-none border-[1px] border-gray-300 rounded-md max-w-[700px]"
                  value={option.input}
                  onChange={(e) => handleInputChange(index , e.target.value)}
                />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 hover:text-red-500 cursor-pointer"
                  onClick={() => deleteOption(index)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg> */}
              </div>
            );
          })}
           <button
            className="mr-auto px-3 py-[-10px] rounded-3xl  border-2 border-gray-300 mb-12
            hover:border-blue"
            onClick={() => setOptions((prev) => [...prev , {input : ""}])}
          >
            <span className="text-[25px] text-gray-500">+</span>
          </button>
        </div>
      </div>
      <CreateQuestionFooter eventCode = {eventCode} handleSaveQuestion={handleSaveQuestion}/>
    </div>
  );
};

export default Poll;
