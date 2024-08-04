import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomSpinner from "../Components/Loading/CustomSpinner";
import McqOrPoll from "../Components/EventResult/McqOrPoll";
import Open from "../Components/EventResult/Open";
import Sort from "../Components/EventResult/Sort";
import Slide from "../Components/EventResult/Slide";
import {createIconsMap} from "../utils/helper";

const iconsMap = createIconsMap();

const EventResultPage = ({ response, code }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      setLoading(true);
      const { data } = await axios.get(`/question/code/${code}`);
      setQuestions(data);
      setLoading(false);
    };
    fetchAllQuestions();
  }, []);

  const countVotes = (id, option) => {
    let votes = 0;
    for (let i of response) {
      for (let j of i.response) {
        if (j.questId === id && j.answers === option) votes++;
      }
    }
    return votes;
  };
  const countCorrectAnswer = (index) => {
    let count = 0;
    for (let i of response) {
      if (i.response[index].answers === questions[index].answers[0])
        count++;
    }
    return count;
  };

  //fetching number of response to a particular question
  const fetchResponseCount = (quesId) => {
    let count = 0;
    for (let i of response) {
      for (let j of i.response) {
        if (j.questId == quesId) {
          count++;
          break;
        }
      }
    }
    return count;
  };

  //method to get all responses of open questions
  const getAllAnswers = (quesId) => {
    const answers = [];
    for (let i of response) {
      for (let j of i.response) {
        if (j.questId == quesId) {
          answers.push(j.answers);
        }
      }
    }
    return answers;
  };

  if (loading) return <CustomSpinner />;
  return (
    <main className="mt-8 flex flex-col gap-y-20">
      {questions.map((ques, index) => {
        const responsesCounts = fetchResponseCount(ques._id);
        return (
          <div
            className="shadow-result py-4 px-4 rounded-2xl"
            key={index}
            style={{ minHeight: "260px" }}
          >
            <div className="flex font-black items-center justify-between">
              <div
                className="flex gap-2 text-[22px]
                 text-[#1d254f]"
              >
                <img src={iconsMap.get(ques.type)} alt="question-icons" className="mr-2 h-[22px] w-[26px] mt-1" />
                <h1>{index + 1}.</h1>
                <h1>{ques.question}</h1>
              </div>
              <div className="flex flex-col items-end w-48">
                {(ques.type === "open" || ques.type === "poll" || ques.type === "sorting") && (
                  <p className="text-[#00c58c] font-black">
                    {responsesCounts} responses
                  </p>
                )}
                {ques.type === "mcq" && (
                  <>
                    <p className="text-[#00c58c] font-black">
                      {countCorrectAnswer(index)} correct
                      answer
                    </p>
                    <p className="text-gray-500 font-medium">
                      out of {responsesCounts} respondent
                    </p>
                  </>
                )}
              </div>
            </div>
            {ques.type != "slide" && responsesCounts === 0 ? (
              <div className="flex flex-col justify-center items-center min-h-40">
                <h1 className="text-[25px] font-black text-blue">
                  No Response Yet
                </h1>
              </div>
            ) : (
              <div className="flex flex-col mt-5">
                {(ques.type === "mcq" || ques.type === "poll") &&
                  ques.options?.map((option, index) => {
                    const votes = countVotes(ques._id, option.input);
                    let votesPercentage = votes;
                    if (votes != 0)
                      votesPercentage = (votes * 100) / response.length;
                    return (
                      <McqOrPoll
                        option={option}
                        votesPercentage={votesPercentage}
                        votes={votes}
                        index={index}
                      />
                    );
                  })}
                {ques.type === "open" &&
                  <div className="flex flex-col gap-2">
                    {
                      getAllAnswers(ques._id).map((ans, index) => (
                        <Open ans={ans} index={index} />
                      ))}

                  </div>
                }
                {ques.type == "sorting" && <Sort options={ques.options} res={response} index={index} answers={ques.answers} />}
                {ques.type === "slide" && <Slide content={ques.answers} photo={ques.photos} />}
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
};

export default EventResultPage;
