import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';

export const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({children}) => {
    const [user,setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser({id : user.uid , name : user.displayName , 
              email : user.email})
            } else {
              console.log("user is logged out")
            }
          });
    },[])
  return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
  )
}