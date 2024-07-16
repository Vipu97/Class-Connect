import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#1d254f"
          className="w-5 h-6 relative top-[23px] left-7"
        >
          <path
            fillRule="evenodd"
            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type={hidePassword ? "password" : "text"}
          placeholder="Password"
          className="rounded-3xl border-2 border-gray-300
          py-1.5 px-3 pl-8 mt-4 w-[300px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="relative right-9 top-[26px] cursor-pointer">
          {hidePassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5"
              onClick={() => setHidePassword(false)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
              onClick={() => setHidePassword(true)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
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
        <p className="h-0 w-[50%] border-[1px] border-gray-200"></p>
        <p className="text-gray-400 my-4">OR</p>
        <p className="h-0 w-[50%] border-[1px] border-gray-200"></p>
      </div>
      <div className="flex gap-3">
        <div
          className="border-2 rounded-[50%] mb-8 p-2 border-black-300 w-auto mx-auto cursor-pointer hover:border-blue"
          onClick={handleGoogleAuth}
        >
          <img src="./google-icon.png" alt="google-icon" width={"20px"} />
        </div>
        <span className="font-bold relative top-2 text-[#1d254f]">{text} with Google</span>
      </div>
    </div>
  );
};

export default AuthForm;
