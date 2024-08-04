import "./App.css";
import IndexPage from "./Pages/IndexPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import EventPage from "./Pages/EventPage";
import axios from "axios";
import HomePage from "./Pages/HomePage";
import { UserContextProvider } from "./Context/userContext";
import Mcq from "./Pages/Mcq";
import QuestionPage from "./Pages/QuestionPage";
import ResultPageHeader from "./Components/EventResult/ResultPageHeader";
import Poll from "./Pages/Poll";
import Open from "./Pages/Open";
import Sorting from "./Pages/Sorting";
import MeetingLobby from "./Pages/MeetingLobby";
import Profile from "./Pages/Profile";
import Slide from "./Pages/Slide";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/event/:code" element={<EventPage />} />
          <Route path="/event/:code/mcq" element={<Mcq />} />
          <Route path="/event/:code/poll" element={<Poll />} />
          <Route path="/event/:code/open" element={<Open />} />
          <Route path="/event/:code/sorting" element={<Sorting />} />
          <Route path = "/event/:code/slide" element = {<Slide />} />
          <Route path="/event/edit/:questId/mcq" element={<Mcq />} />
          <Route path="/event/edit/:questId/poll" element={<Poll />} />
          <Route path="/event/edit/:questId/open" element={<Open />} />
          <Route path="/event/edit/:questId/sorting" element={<Sorting />} />
          <Route path="/event/edit/:questId/slide" element={<Slide />} />
          <Route path="/event/submit/:code" element={<QuestionPage />} />
          <Route path="/event/:code/result" element={<ResultPageHeader />} />
          <Route path="/meeting" element={<MeetingLobby />} />
        </Routes>
    </UserContextProvider>
  );
}

export default App;
