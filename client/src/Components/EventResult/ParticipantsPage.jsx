import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import axios from "axios";
import CorrectIcon from "./CorrectIcon";
import profileIcon from "../../assets/svgs/profileIcon.svg";
import {createIconsMap} from "../../utils/helper";

const iconsMap = createIconsMap();

const ArrowDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

const ParticipantsPage = ({ response, code }) => {
  const [userNames, setUserNames] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedName, setSelectedName] = useState("");

  const fetchAllUserNames = () => {
    const users = [];
    for (let i of response) {
      users.push(i.userName);
    }
    setUserNames(users);
  };

  const fetchAllQuestions = async () => {
    const { data } = await axios.get(`/question/code/${code}`);
    setQuestions(data);
  };
  useEffect(() => {
    fetchAllUserNames();
    fetchAllQuestions();
  }, [response, code]);

  return (
    <div className="py-5">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ArrowDown />}
          style={{
            background: "rgb(255, 255, 255)",
            padding: "16px",
            borderRadius: "10px",
            boxShadow: "rgba(20, 106, 255, 0.2) 0px 10px 45px",
          }}
        >
          <div className="flex items-center gap-3 w-80">
            <img src={profileIcon} alt="profile-icon" className="w-5 h-5 relative bottom-0.5" />
            <span>{selectedName || "Select a student"}</span>
          </div>
        </MenuButton>
        <MenuList className="w-80 h-36 overflow-y-scroll">
          {userNames.map((name, idx) => {
            return (
              <MenuItem
                key={idx}
                value={name}
                onClick={(e) => setSelectedName(e.target.value)}
              >
                {name}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      <div className="my-10 flex flex-col gap-y-10 items-center">
        {selectedName &&
          questions.map((ques, index) => {
            let currResponse = response.filter(
              (res) => res.userName === selectedName
            )[0].response;
            return (
              <div
                key={index}
                className={
                  "border-2 border-gray-200 py-4 px-3 rounded-2xl bg-[#f5f7fb] flex flex-col gap-y-3 w-full max-w-[1000px]"
                }
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={iconsMap.get(ques.type)}
                    alt="ques-icon"
                    height={"15px"}
                    width={"20px"}
                  />
                  <h1 className="font-bold">
                    <span className="pr-3">{index + 1}.</span>
                    {ques.question}
                  </h1>
                </div>
                {ques.type === "open" && (
                  <div
                    className="bg-white text-center py-2.5 px-3 min-h-16 rounded-2xl text-gray-350 w-full max-w-[800px] mx-auto"
                    style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, .08)" }}
                  >
                    {currResponse[index].answers}
                  </div>
                )}
                {ques.type === "sorting" && (
                  <div className="flex flex-col gap-5 px-4">
                    {currResponse[index].answers.map((opt, idx) => {
                      let isAnswerCorrect =
                        ques.answers[idx].input === opt.input;
                      return (
                        <div
                          key={idx}
                          style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, .08)" }}
                          className="px-4 py-3 rounded-2xl min-h-16 w-full max-w-[550px] mx-auto flex justify-between items-center"
                        >
                          <div>
                            <p>{opt.input}</p>
                            {!isAnswerCorrect && (
                              <div className="font-bold text-[14px] text-gray-450 flex items-center gap-1">
                                <div className="p-0.5 rounded-[50%] bg-green-150 w-4 h-4 flex flex-col justify-center items-center">
                                  <CorrectIcon />
                                </div>
                                {questions[index].answers[idx].input}
                              </div>
                            )}
                          </div>
                          {isAnswerCorrect ? (
                            <div className="p-1 rounded-[50%] bg-green-150 w-8 h-8 flex flex-col justify-center items-center">
                              <CorrectIcon />
                            </div>
                          ) : (
                            <div className="w-8 rounded-[50%] bg-red-500 h-8 flex flex-col justify-center items-center">
                              <span className="text-white font-extrabold text-[20px]">
                                X
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                {ques.type === "mcq" && (
                  <div className="w-full max-w-[550px] mx-auto flex flex-col gap-5">
                    <div className="flex flex-col gap-5 px-4">
                      {ques.options.map((opt, idx) => {
                        return (
                          <div
                            className="bg-white text-center py-2.5 px-4 min-h-16 rounded-2xl text-gray-350 w-full  flex justify-between items-center"
                            style={{
                              boxShadow: "0 0 10px 0 rgba(0, 0, 0, .08)",
                            }}
                            key={idx}
                          >
                            <span>{opt.input}</span>
                            {currResponse[index].answers === opt.input && (
                              <span>
                                {ques.answers[0] !== opt.input ? (
                                  <div className="w-8 rounded-[50%] bg-red-500 h-8 flex flex-col justify-center items-center">
                                    <span className="text-white font-extrabold text-[20px]">
                                      X
                                    </span>
                                  </div>
                                ) : (
                                  <div className="p-0.5 rounded-[50%] bg-green-150 w-8 h-8 flex flex-col justify-center items-center">
                                    <CorrectIcon />
                                  </div>
                                )}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className="flex flex-col items-center 
                    justify-center border-t-[1px] mt-1"
                    >
                      <span className="font-extrabold mt-2">
                        Correct answer
                      </span>
                      <div
                        className="px-4 py-3 rounded-2xl min-h-16 w-full max-w-[550px] mx-auto flex justify-between items-center mt-4"
                        style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, .08)" }}
                      >
                        <span>{ques.answers[0]}</span>
                      </div>
                    </div>
                  </div>
                )}
                {ques.type === "poll" && (
                  <div>
                    {ques.options.map((opt, idx) => {
                      let isSelected =
                        opt.input === currResponse[index].answers;
                      return (
                        <div
                          className={`px-4 py-3 rounded-2xl min-h-16 w-full max-w-[550px] mx-auto flex justify-between items-center mt-4 ${
                            isSelected && " bg-blue"
                          }`}
                          style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, .08)" }}
                          key={idx}
                        >
                          {opt.input}
                        </div>
                      );
                    })}
                  </div>
                )}
                {ques.type === "slide" && (
                  <div className="flex flex-col justify-center mx-auto w-full py-5 rounded-xl h-full items-center px-4 cursor-pointer shadow-question gap-4 max-w-[1100px]">
                    <div>
                      <img
                        src={ques.photos}
                        alt="slide-photo"
                        className="w-full max-w-[700px] rounded-xl object-cover h-96"
                      />
                    </div>
                    <div>
                      <h1 className="text-[35px] font-bold text-center">{ques.question}</h1>
                      <p className="text-wrap text-[18px]">{ques.answers}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ParticipantsPage;
