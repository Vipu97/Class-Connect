import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import McqOption from "../Components/CreateQuestion/McqOption";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import BackButton from "../Components/CreateQuestion/BackButton";
import CreateQuestionFooter from "../Components/CreateQuestion/CreateQuestionFooter";

const Mcq = () => {
  const {code,questId} = useParams();
  const [eventCode,setEventCode] = useState(code || "");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { input: "", isAnswer: false },
    { input: "", isAnswer: false },
  ]);
  const toast = useToast();
  const inputRef = useRef();
  const navigate = useNavigate();
  const editMode = questId ? true : false;

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      const {data} = await axios.get(`/question/${questId}`);
      if(data){
        setQuestion(data.question);
        setEventCode(data.eventCode);
        setOptions(data.options);
      }
    }
    if(questId)
      fetchQuestionDetails();
  },[])
  const handleInputChange = useCallback((index, value) => {
    const newOptions = [...options];
    newOptions[index].input = value;
    setOptions(newOptions);
  });

  const handleCheckBoxChange = useCallback((index, value) => {
    const newOptions = [...options];
    for(let i of newOptions){
      i.isAnswer = false;
    }
    newOptions[index].isAnswer = value;
    console.log(newOptions);
    setOptions(newOptions);
  });

  const createNewOption = useCallback(() => {
    const newOptions = [...options];
    newOptions.push({ input: "", isAnswer: false });
    setOptions(newOptions);
  });

  const deleteOption = useCallback((index) => {
    if (options.length === 1) return;
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  });

  const handleSaveQuestion = () => {
    //validations
    if (question === "") {
      inputRef.current.focus();
      toast({
        title: "Question can't be empty!!",
        status: "error",
      });
      return;
    }
    let checked = 0;
    for (let i of options) {
      if (i.input === "") {
        toast({
          title: "Options can't be empty",
          description: "You can delete the option if you want",
          status: "error",
        });
        return;
      }
      if (i.isAnswer == true) checked++;
    }
    if (checked === 0) {
      toast({
        title: "You must have to select atleast one answer",
        status: "error",
      });
    } else if (checked === options.length) {
      toast({
        title: "You can't select all option as answers",
        status: "error",
      });
    }else{
      const answers = [];
      options.map(option => {
        if(option.isAnswer)
          answers.push(option.input);
      })
      if(!editMode){
        axios.post('/question',{question , answers , eventCode, type : 'mcq' , options})
      }else{
        axios.put('/question',{id:questId ,question , answers , eventCode, type : 'mcq' , options})
      }
      navigate(`/event/${eventCode}`);
    }
  };
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
          placeholder="Example : What is the capital of India?"
          className="w-full py-2.5 px-3 max-w-[1000px] border-[1px] focus:outline-blue rounded-xl
          focus:outline-[1px] my-2 resize-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          ref={inputRef}
        />
      </div>
      <div className="mt-3 px-6">
        <h1 className="text-[25px] font-bold">Answers</h1>
        <p className="mt-[-5px]">
          Enter the answers and pick or mark one correct answer
        </p>
        <div className="flex flex-col my-5">
          {options.map((option, index) => {
            return (
              <McqOption
                option={option}
                handleInputChange={handleInputChange}
                index={index}
                deleteOption={deleteOption}
                handleCheckBoxChange={handleCheckBoxChange}
              />
            );
          })}
          <button
            className="mr-auto px-3 py-[-10px] rounded-3xl  border-2 border-gray-300 mb-12
            hover:border-blue"
            onClick={createNewOption}
          >
            <span className="text-[25px] text-gray-500">+</span>
          </button>
        </div>
      </div>
      <CreateQuestionFooter eventCode={eventCode} handleSaveQuestion={handleSaveQuestion}/>

    </div>
  );
};

export default Mcq;
