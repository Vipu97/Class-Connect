import React, { useState } from "react";
import AuthHeader from "../Components/Auth/AuthHeader";
import Auth from "../Components/Auth/Auth";
import AuthForm from "../Components/Auth/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import CustomSpinner from "../Components/Loading/CustomSpinner";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import profileIcon from "../assets/svgs/profileIcon.svg";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password,
        name
      )
      const user = userCredential.user;
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      await axios.post("/user", { name, email, _id: user.uid });
      navigate("/login");
      toast({
        status: "success",
        title: "Registration Successfull"
      })
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        return toast({
          status: "info",
          title: "Email Already registered",
          description: "You can directly sign in with the same email"
        })
      }
      else if (error.code == "auth/weak-password") {
        return toast({
          status: "warning",
          title: "Password is too Weak",
          description: "Minimum 6 characters are required"
        })
      }
    }
    finally {
      setLoading(false);
    }
  };

  if (loading)
    return <CustomSpinner />
  return (
    <div>
      <AuthHeader text={"Login"} />
      <div className="flex flex-col gap-x-8 lg:flex-row">
        <Auth />
        <div
          className="flex justify-center items-center w-full lg:bg-[#f1f3f8] lg:h-[100vh] lg:relative 
          lg:bottom-[90px] lg:z-10 lg:py-20 "
        >
          <form
            className="flex flex-col justify-center gap-1 items-center mt-12"
            onSubmit={registerUser}
          >
            <h1 className="text-[22px] font-black text-[#1d254f] text-center">
              Create and host events
            </h1>
            <p className="text-center font-medium text-md text-gray-500">
              Create an account and boost your presentations
            </p>
            <span className="text-center text-gray-500 text-sm font-medium">
              Already have an account?
              <Link className="text-blue underline" to={"/login"}>
                {" "}
                Log in
              </Link>
            </span>
            <div className="flex w-full max-w-[320px] relative right-1 lg:mt-5">
              <img src={profileIcon} alt="profile-icon" className="w-5 h-6 relative top-[23px] left-7" />
              <input
                type="text"
                placeholder="Name"
                className="rounded-3xl border-2 border-gray-300
          py-1.5 px-3 pl-8 mt-4 w-[300px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <AuthForm
              text={"Sign up"}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setLoading={setLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
