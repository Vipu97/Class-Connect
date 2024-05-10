import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/userContext";
import { Tooltip, useToast } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { auth } from "../../utils/firebase";

const Layout = () => {
  const { user,setUser } = useUserContext();
  const navigate = useNavigate();
  const toast = useToast();
  const navigateToProfile = () => {
    const currentUrl = window.location.href;
    navigate("/profile");
    sessionStorage.setItem("returnUrl",currentUrl);
  }
  const handleLogout = async () => {
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
  
  return (
    <header className="flex justify-between py-3 items-center">
      <Link className="text-[27px] font-black text-blue" to={"/home"}>
        wooclap
      </Link>
      <Menu className={"w-fit"}>
        <Tooltip label={user?.name}>
          <MenuButton as={Button} style={{ backgroundColor: "white" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#3d7dea"
              className="w-9 h-9"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </MenuButton>
        </Tooltip>
        <MenuList
          style={{
            borderRadius: "10px",
            boxShadow: "rgba(29, 37, 79, 0.16) 0px 4px 16px 0px",
          }}
        >
          <MenuItem className="flex flex-col border-b-2">
            <p className="font-bold text-gray-400 text-[15px] ">Signed in as</p>
            <p className="text-[#1d254f]">{user?.email}</p>
          </MenuItem>
          <MenuItem className="font-semibold text-[#1d254f] my-1">
            <p onClick={navigateToProfile}>Account Settings</p>
          </MenuItem>
          <MenuItem className="my-1">
            <button className="flex gap-1 text-red-500 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>

              <button onClick={handleLogout}>Sign Out</button>
            </button>
          </MenuItem>
        </MenuList>
      </Menu>
    </header>
  );
};

export default Layout;
