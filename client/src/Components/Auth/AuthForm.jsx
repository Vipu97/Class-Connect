import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import lockIcon from "../../assets/svgs/lockIcon.svg";
import openEye from "../../assets/svgs/openEye.svg";
import closeEye from "../../assets/svgs/closeEye.svg";
import googleIcon from "../../assets/pngs/google-icon.png";

const AuthForm = ({
  text,
  email,
  setEmail,
  password,
  setPassword,
  handleResetPassword,
  setLoading
}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setLoading(true);
      const user = result.user;
      await axios.post("/user", {
        _id: user.uid,
        email: user.email,
        name: user.displayName,
        emailVerified: user.emailVerified,
      });
      const returnUrl = sessionStorage.getItem('returnUrl');
      if (returnUrl) {
        sessionStorage.removeItem("returnUrl");
        navigate(returnUrl);
        setLoading(false);
      } else {
        navigate("/home");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex w-full max-w-[320px]">
        <span className="font-black relative top-[23px] left-7">@</span>
        <input
          type="email"
          placeholder="Email"
          className="rounded-3xl border-2 border-gray-300
          py-1.5 px-3 pl-8 mt-4 w-[300px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex w-full max-w-[345px] relative left-1.5">
        <img src={lockIcon} alt="lock-icon" className="w-4.5 h-5 relative top-[25px] left-7" />
        <input
          type={hidePassword ? "password" : "text"}
          placeholder="Password"
          className="rounded-3xl border-2 border-gray-300
          py-1.5 px-3 pl-8 mt-4 w-[335px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="relative right-9 top-[26px] cursor-pointer">
          {hidePassword ? (
           <img src={openEye} alt="open-eye" className="w-5 h-5"
           onClick={() => setHidePassword(false)}/>
          ) : (
           <img src={closeEye} alt="close-eye" className="w-5 h-5"
           onClick={() => setHidePassword(true)}/>
          )}
        </div>
      </div>
      {text === "Login" && (
        <p
          className="text-sm text-red-500 font-medium ml-auto mr-5 cursor-pointer hover:text-red-300"
          onClick={handleResetPassword}
        >
          Forgot Password??
        </p>
      )}
      <button
        className={`bg-blue text-white border-2 border-transparent hover:bg-white
    hover:border-blue rounded-3xl hover:text-blue py-1.5 w-[305px] mx-auto mt-6 relative left-1`}
      >
        {text}
      </button>
      <div className="flex w-full items-center gap-3">
        <p className="h-0 w-[50%] border-[1px] border-gray-300"></p>
        <p className="text-gray-400 my-4">OR</p>
        <p className="h-0 w-[50%] border-[1px] border-gray-300"></p>
      </div>
      <div className="flex gap-3">
        <div
          className="border-2 rounded-[50%] mb-4 p-2 border-black-300 w-auto mx-auto cursor-pointer hover:border-blue"
          onClick={handleGoogleAuth}
        >
          <img src={googleIcon} alt="google-icon" width={"20px"} />
        </div>
        <span className="font-bold relative top-2 text-[#1d254f]">{text} with Google</span>
      </div>
    </div>
  );
};

export default AuthForm;
