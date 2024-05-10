import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Responded from "../Components/Responded";
import CustomSpinner from "../Components/CustomSpinner";
import { useUserContext } from "../Context/userContext";
import { useToast } from "@chakra-ui/react";
import ProfilePopover from "../Components/ProfilePopover";
import PollOrMcq from "../Components/QuestionDisplay/PollOrMcq";
import Sort from "../Components/QuestionDisplay/Sort";
import Open from "../Components/QuestionDisplay/Open";
import Slide from "../Components/QuestionDisplay/Slide";

const QuestionPage = () => {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState(null);
  const [alreadyResponded, setAlReadyResponded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hostId, setHostId] = useState("");
  const { user } = useUserContext();
  const toast = useToast();
  const navigate = useNavigate();

  const fetchEventDetails = async () => {
    const { data } = await axios.get(`/event/${code}`);
    setHostId(data.organiser);
  };

  const submitAnswer = async () => {
    if (!isLoggedIn) {
      return toast({
        status: "error",
        title: "You are not signed in",
        description: "Sign in to submit your response",
      });
    }
    for (let i = 0; i < response.length; i++) {
      if (response[i].answers == null) {
        return toast({
          status: "error",
          title: "Respond to all questions before submitting",
          description: `Question no. ${i + 1} is not responded`,
        });
      }
    }
    if (user.id == hostId) {
      return toast({
        status: "error",
        title: "This event is hosted by you",
        description: "You can't respond to your own hosted events",
      });
    }

    await axios.post("/event/response", {
      userId: user.id,
      userName: user.name,
      response,
      code,
    });
    setAlReadyResponded(true);
  };

  const isAlreadySubmitted = async (userId) => {
    const { status } = await axios.get(
      `/event/submit/isSubmitted?userId=${userId}&code=${code}`
    );
    if (status === 200) setAlReadyResponded(true);
  };

  const fetchQuestions = useCallback(async () => {
    const { data } = await axios.get(`/question/code/${code}`);
    setQuestions(data);
  }, [code]);

  //handling sign in so that user can be redirect back to the page after signing in
  const handleSignIn = () => {
    sessionStorage.setItem("returnUrl", `/event/submit/${code}`);
    navigate("/login");
  };

  const createResponse = () => {
    const defaultResponse = [];
    for (let i of questions) {
      if(i.type === "slide"){
        defaultResponse.push({ questId: i._id, answers: "not required" });
      }
      else{
        defaultResponse.push({ questId: i._id, answers: null });
      }
    }
    setResponse(defaultResponse);
  };
  useEffect(() => {
    if (user?.id) setIsLoggedIn(true);
    fetchQuestions();
    isAlreadySubmitted(user?.id);
  }, [user]);

  useEffect(() => {
    fetchEventDetails();
    createResponse();
  }, [questions, user]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  if (loading) return <CustomSpinner />;
  return (
    <>
      {user && alreadyResponded  ? (
        <Responded name={user?.name} />
      ) : (
        <div>
          <header
            className="bg-blue w-full h-[70px] flex py-4 pl-5 pr-3 
          justify-between sm:pl-9 sm:pr-6"
          >
            <Link className="font-black text-2xl text-white">wooclap</Link>
            {isLoggedIn ? (
              <ProfilePopover user={user} />
            ) : (
              <button
                className="bg-white w-24 h-10 rounded-3xl font-extrabold border-white text-md border-2 hover:border-black flex items-center justify-center"
                onClick={handleSignIn}
              >
                Sign In
              </button>
            )}
          </header>
          <main className="flex flex-col justify-center gap-20 mt-10 px-2">
            {questions.map((quest, index) => {
              return (
                <div
                  className="flex flex-col justify-center gap-4"
                  key={quest._id}
                >
                  <div className="flex justify-center">
                    <h1 className="text-2xl font-extrabold text-center max-w-[1000px] px-2">
                      {quest.type !== "slide" && quest.question}
                    </h1>
                  </div>

                  {quest.type === "open" && (
                    <Open
                      quest={quest}
                      response={response}
                      setResponse={setResponse}
                      index={index}
                    />
                  )}

                  {quest.type === "sorting" && (
                    <Sort
                      options={quest.options}
                      response={response}
                      setResponse={setResponse}
                      idx={index}
                    />
                  )}

                  {(quest.type === "poll" || quest.type === "mcq") && (
                    <PollOrMcq
                      index={index}
                      options={quest.options}
                      response={response}
                      setResponse={setResponse}
                    />
                  )}
                  {quest.type === "slide" && (
                    <Slide
                      title={quest.question}
                      content={quest.answers}
                      photo={quest.photos}
                    />
                  )}
                </div>
              );
            })}
          </main>
          <footer className="my-10 flex justify-center">
            <button
              className="w-full py-2 px-5 text-blue font-black text-2xl max-w-[400px] shadow-question rounded-3xl hover:scale-105 hover:border-blue hover:border-2"
              onClick={submitAnswer}
            >
              Submit
            </button>
          </footer>
        </div>
      )}
    </>
  );
};

export default QuestionPage;
