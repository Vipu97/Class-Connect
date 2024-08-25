import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../Components/Auth/Auth";
import AuthHeader from "../Components/Auth/AuthHeader";
import AuthForm from "../Components/Auth/AuthForm";
import { useToast } from "@chakra-ui/react";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getAuth,
} from "firebase/auth";
import axios from "axios";
import CustomSpinner from "../Components/Loading/CustomSpinner";

const LoginPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const auth = getAuth();

  const handleResetPassword = async () => {
    if (email.length === 0) {
      return toast({
        status: "error",
        title: "Enter a email first",
      });
    }
    const { data } = await axios.get(`/user/${email}`);
    if (!data) {
      return toast({
        status: "error",
        title: "Email doesn't exist/registered",
      });
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        return toast({
          status : "info",
          title : "Reset Password Email Sent",
          description : "A link for reseting email has been sent to the provided email"
        })
      })
      .catch((err) => {
       cosole.log(err.message)
      });
  };
  
  const loginUser = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const returnUrl = sessionStorage.getItem('returnUrl');
      if(returnUrl){
        sessionStorage.removeItem("returnUrl");
        navigate(returnUrl);
      }else{
        navigate("/home");
      }
    } catch (error) {
      if (error.code == "auth/invalid-credential") {
        return toast({
          status: "error",
          title: "Invalid Email or password",
          description: "Make sure email is registered or password is correct",
        });
      } else {
        return toast({
          status: "error",
          title: "Internal Error",
        });
      }
    }
    finally{
      setLoading(false);
    }
  };

  if(loading)
    return <CustomSpinner />;
  return (
    <div>
      {/* header */}
      <AuthHeader text="Sign up" />

      <div className="flex flex-col gap-y-8 lg:flex-row">
        {/* left side */}
        <Auth />

        {/* right side */}
        <div
          className="flex justify-center items-center w-full lg:bg-[#f1f3f8] lg:relative lg:bottom-[86px] lg:z-10 lg:py-20 lg:h-[100vh]"
        >
          <div className="flex flex-col justify-center mt-7 w-full max-w-[320px] mx-auto items-center">
            <h1 className="text-[22px] font-black text-[#1d254f] text-center">
              Choose a method to log in
            </h1>
            <span className="text-center font-medium text-md text-gray-500 mb-5">
              Don't have an account?{" "}
              <Link className="text-blue underline" to={"/register"}>
                Sign Up
              </Link>
            </span>
            <form onSubmit={loginUser}>
              <AuthForm
                text={"Login"}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleResetPassword={handleResetPassword}
                setLoading={setLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
