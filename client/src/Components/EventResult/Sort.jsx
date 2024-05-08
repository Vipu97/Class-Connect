import React, { useState, useEffect } from "react";
import CorrectIcon from "./CorrectIcon";

const Sort = ({ options, res, index,answers }) => {
  const [topResponse, setTopResponse] = useState([]);

  function storingCounts() {
    const responsesCounts = new Map();
    for (let i of res) {
      let key = JSON.stringify(i.response[index].answers);
      if (responsesCounts.has(key)) {
        responsesCounts.set(key, responsesCounts.get(key) + 1);
      } else {
        responsesCounts.set(key, 1);
      }
    }
    return responsesCounts;
  }

  function calculatingTopResponses() {
    const responsesCounts = storingCounts();
    const sortedArray = [...responsesCounts.entries()];
    sortedArray.sort((a, b) => b[1] - a[1]);
    const sortedMap = new Map(sortedArray);
    const commonReponse = [];
    sortedMap.forEach((key, value) => {
      if (commonReponse.length === 3) return;
      commonReponse.push(JSON.parse(value));
    });
    setTopResponse(commonReponse);
  }

  const findIndex = (op) => {
    for(let i=0;i<answers.length;i++){
      if(answers[i].input === op)
        return i;
    }
  }

  const checkAnswer = (resp) => {
    for (let i = 0; i < resp.length; i++) {
      if (resp[i].input !== answers[i].input) return false;
    }
    return true;
  };

  //function to store count of correct predict option
  const countCorrectOptionCount = (ind) => {
    let count = 0;
    for(let i of res){
      if(i.response[index].answers[ind].input === answers[ind].input)
        count++;
    }
    return count;
  }
  useEffect(() => {
    calculatingTopResponses();
  }, [options]);

  return (
    <div
      className="flex flex-col gap-8"
      style={{ boxShadow: "rgba(20, 106, 255, 0.16) 0px 8px 32px 0px" }}
    >
      <h1
        className="text-[24px] font-black text-[#1d254f] text-center 
      my-[-10px]"
      >
        Most frequent Combinations:
      </h1>
      <div className="flex justify-between gap-6">
        {topResponse.map((resp, idx) => {
          return (
            <div className="w-full" key={idx}>
              <div className="bg-[#9bbefd] h-14 rounded-t-2xl flex justify-between px-2 items-center">
                <div className="flex h-8 bg-white gap-1 rounded-3xl items-center px-2.5">
                  <span className="font-black">
                    {storingCounts().get(JSON.stringify(resp))}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                {checkAnswer(resp) ? (
                  <div className="p-1 rounded-[50%] bg-green-150">
                 <CorrectIcon />
                  </div>
                ) : (
                  <div className="px-2 rounded-[50%] bg-red-500">
                    <span className="text-white font-extrabold text-[20px]">X</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4 py-2">
                {resp.map((ans, i) => {
                  return (
                    <div
                      className="flex items-center justify-between px-3 "
                      key={i}
                    >
                      <div
                        className="h-8 w-8 rounded-[50%] flex flex-col text-white font-bold items-center justify-center border-2 border-[#ffffff]"
                        style={{
                          boxShadow:
                            "rgba(20, 106, 255, 0.25) 0px 3px 10px 0px",
                          background:
                            "linear-gradient(rgb(45, 163, 255) 0%, rgb(20, 106, 255) 100%)",
                        }}
                      >
                        <span>{findIndex(ans.input) + 1}</span>
                      </div>
                      <h1>{ans.input}</h1>
                      {answers[i].input === ans.input ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="4"
                          stroke="currentColor"
                          className="w-5 h-5 text-green-150"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      ) : (
                        <span className="text-red-500 font-extrabold text-[20px] w-4">
                          X
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className={"bg-[#14a975] rounded-3xl pt-2 pb-4 px-3 col-span-3"}>
        <h1 className="text-center text-[25px] text-white font-black pb-1">
          Correct answer
        </h1>
        <div className="bg-white rounded-xl p-3 flex flex-col gap-4">
          {answers.map((opt, ind) => {
            return (
              <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                  <div
                    className="h-8 w-8 rounded-[50%] flex flex-col items-center justify-center border-2 border-[#ffffff]"
                    style={{
                      boxShadow: "rgba(20, 106, 255, 0.25) 0px 3px 10px 0px",
                      background:
                        "linear-gradient(rgb(45, 163, 255) 0%, rgb(20, 106, 255) 100%)",
                    }}
                  >
                    <span className="text-white font-bold">{ind + 1}</span>
                  </div>
                  <p className="font-medium">{opt.input}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-[#14a975] font-black text-[20px] mt-1">
                    {countCorrectOptionCount(ind)}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="27"
                    fill="#14a975"
                    className="bi bi-person-check"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                    <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sort;
