import React, { useEffect, useState } from "react";
import BackButton from "../Components/CreateQuestion/BackButton";
import Photo from "../icons/Photo";
import axios from "axios";
import CreateQuestionFooter from "../Components/CreateQuestion/CreateQuestionFooter";
import { useNavigate, useParams } from "react-router-dom";

const Slide = () => {
  const { code, questId } = useParams();
  const [editMode,setEditMode] = useState(questId ? true : false);
  const [slideTitle, setSlideTitle] = useState("Slide Title");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoUrl,setSelectedPhotoUrl] = useState("");
  const [eventCode, setEventCode] = useState(code || "");
  const navigate = useNavigate();
  const [content, setContent] = useState(
    "Paragraph goes here, on one or several lines. It all depends on what you have to say."
  );

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    setSelectedPhoto(file);
    const data = new FormData();
    data.append("photo", file);
    axios.post("/slide/upload", data).then((res) => {
      setSelectedPhotoUrl(res.data);
    }).catch(err => {
      console.error(err.message)
    });
  };

  const handleRemovePhoto = () => {
    setSelectedPhotoUrl(null);
  };

  const handleSaveQuestion = async () => {
    if(editMode){
      await axios.put("/question" , {id : questId , eventCode,type : "slide", question : slideTitle , answers : content , photos : selectedPhotoUrl})
    }else{
      await axios.post('/question',{question:slideTitle,eventCode,type:'slide',answers:content,photos:selectedPhotoUrl});
    }
    navigate(`/event/${eventCode}`);
  };

  const fetchQuestionDetails = async () => {
    const {data} = await axios.get(`/question/${questId}`);
    setEventCode(data.eventCode);
    setSlideTitle(data.question);
    setContent(data.answers[0]);
    setSelectedPhotoUrl(data.photos);
  }

  useEffect(() => {
    fetchQuestionDetails();
  },[]);

  return (
    <div className="py-6 flex flex-col gap-6">
      <BackButton eventCode={eventCode} />
      <div className="px-6">
        <h1 className="text-[25px] font-bold">Text</h1>
        <p className="mt-[-5px]">Enter the text of your slide</p>
        <div className="flex flex-col gap-5 w-full">
          <div className="w-full mt-4">
            <h1 className="font-bold text-blue">Title</h1>
            <input
              type="text"
              placeholder="#Slide Title"
              className="w-full max-w-[1000px] border-[1px] rounded-xl py-2 px-3"
              value={slideTitle}
              onChange={(e) => setSlideTitle(e.target.value)}
            />
          </div>
          <div>
            <h1 className="font-bold text-blue">Content</h1>
            <textarea
              type="text"
              className="w-full max-w-[1000px] border-[1px] rounded-xl py-2 px-3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div
          style={{
            boxShadow: "rgba(29, 37, 79, 0.16) 0px 32px 48px 0px",
            overflow: "hidden",
          }}
          className="flex flex-col gap-10 px-4 py-10 items-center w-full lg:flex-row xs:px-8 mb-36"
        >
          {selectedPhotoUrl ? (
            <div className="cursor-pointer">
              <img
                src={selectedPhotoUrl}
                alt="selected-photo"
                className="h-56 lg:h-80 rounded-xl object-cover"
              />
              <button
                className="rounded-3xl px-3 py-2 bg-red-400 font-bold hover:scale-105 relative bottom-14 left-4"
                onClick={handleRemovePhoto}
              >
                Remove Photo
              </button>
            </div>
          ) : (
            <label
              className="h-56 bg-[#c2cbd6] rounded-2xl flex flex-col
          gap-y-2 items-center justify-center text-[#1d254f] w-full
          max-w-[400px] lg:w-[500px] lg:min-w-[400px] lg:h-80 hover:text-blue cursor-pointer hover:border-blue 
          hover:border-2 hover:border-dashed"
            >
              <input
                className="h-56 lg:h-80"
                style={{ display: "none" }}
                type="file"
                onChange={handleAddImage}
              />
              <div className="cursor-pointer">
                <Photo />
              </div>
              <h1 className="font-black">Click here to add an image</h1>
              <span className="font-medium text-[13px]">
                Files accepted : PNG, JPEG, GIF
              </span>
            </label>
          )}
          <div className="w-full lg:max-w-[670px]">
            <pre className="text-[30px] font-semibold xs:text-[35px]">
              {slideTitle}
            </pre>
            <pre className="text-[18px] xs:text-[23px] leading-tight text-wrap">
              {content}
            </pre>
          </div>
        </div>
      </div>
      <CreateQuestionFooter
        eventCode={eventCode}
        handleSaveQuestion={handleSaveQuestion}
      />
    </div>
  );
};

export default Slide;
