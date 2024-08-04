import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomSpinner from "../Components/Loading/CustomSpinner";
import { useUserContext } from "../Context/userContext";
import { useToast } from "@chakra-ui/react";
import ProfilePopover from "../Components/QuestionDisplay/ProfilePopover";
import ZeroQuestions from "../Components/QuestionDisplay/ZeroQuestions";
import List from "../Components/QuestionDisplay/List";
import Responded from "../Components/QuestionDisplay/Responded";

const QuestionPage = () => {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState([]);
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
      if (i.type === "slide") {
        defaultResponse.push({ questId: i._id, answers: "not required" });
      }
      else {
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
    }, 1500);
  });

  return (
    <>
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
        {loading ? <CustomSpinner /> :
          user && alreadyResponded ? <Responded name={user?.name} /> : (
            (questions.length === 0 && !loading) ? <ZeroQuestions /> : <List questions={questions} submitAnswer={submitAnswer} response={response} setResponse={setResponse} />
          )}
      </div>

    </>
  );
};

export default QuestionPage;
