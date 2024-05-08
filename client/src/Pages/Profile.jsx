import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { auth } from "../utils/firebase";
import { useUserContext } from "../Context/userContext";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const toast = useToast();
  const { setUser,user } = useUserContext();
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [instituteName,setInstituteName] = useState("");
  const [country,setCountry] = useState("");

  const fetchUserDetails = async (userId) => {
    const {data} = await axios.get(`/user/id/${userId}`);
    setName(data.name)
    setPhone(data.phone || null);
    setInstituteName(data.instituteName || null);
    setCountry(data.country || null);
  }

  const handleSaveProfile = async (userId) => {
    const {data} = await axios.put(`/user`,{id:userId,name,phone,instituteName,country});
    window.location.href = sessionStorage.getItem("returnUrl");
    sessionStorage.removeItem("returnUrl");
  }
  const handleLogOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
      toast({
        status: "success",
        title: "Logout Successfully",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    if(user)
      fetchUserDetails(user.id);
  },[user])
  return (
    <div>
      <div className="flex gap-2 items-center m-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#1d254f"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className ="w-7 h-8 relative bottom-0.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
        <span className="text-[25px] font-bold text-[#1d254f]">Account Settings</span>
      </div>
      <div className="mt-5 grid grid-rows-3 xs:grid-cols-2 gap-5 m-8 mb-24">
        <div className="flex flex-col">
          <label>Name</label>
          <input type="text" className="p-2 border-[1px] border-[#d3d6e6] rounded-md w-full max-w-[400px]" value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div className="flex flex-col">
          <label>Phone Number</label>
          <input type="phone" className="p-2 border-[1px] border-[#d3d6e6] rounded-md w-full max-w-[400px]" value={phone} onChange={e => setPhone(e.target.value)}  placeholder="Not Provided yet"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Institute's Name</label>
          <input type="text" className="p-2 border-[1px] border-[#d3d6e6] rounded-md w-full max-w-[400px]" value={instituteName} onChange={e => setInstituteName(e.target.value)} placeholder="Not Provided yet"/>
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input type="email" value={user?.email} className="p-2 border-[1px] border-[#d3d6e6] rounded-md w-full max-w-[400px] font-semibold" disabled/>
        </div>
        <div className="flex flex-col">
          <label>Country</label>
          <input type="text" className="p-2 border-[1px] border-[#d3d6e6] rounded-md w-full max-w-[400px] font-semibold" value={country} onChange={e => setCountry(e.target.value)} placeholder = "Not Provided yet" />
        </div>
      </div>
      <div className="fixed bottom-0 p-2 xs:px-6 z-10 bg-white border-t-2 border-gray-200 w-full">
      <div className="flex justify-between w-full">
        <Link
          to={sessionStorage.getItem('returnUrl')}
          className="font-black text-gray-600 hover:text-blue 
            py-2 px-5 rounded-3xl bg-white hover:bg-[#e0e8f2]"
        >
          Cancel
        </Link>
        <div className="flex gap-6">
          <button
            className="font-black py-1.5 px-6 border-2 border-[#5e94f1cc]
             bg-blue rounded-3xl hover:bg-gray-100 text-white
              hover:text-black"
            onClick={() => handleSaveProfile(user.id)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
