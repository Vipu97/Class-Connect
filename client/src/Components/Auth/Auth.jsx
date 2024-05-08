import React from 'react';
import Button from '../Button';

const Auth = () => {
  return (
    <div className="h-96 bg-white md:w-[600px] lg:h-[100vh] mx-auto lg:mx-0">
          <div className="bg-[rgb(246, 247, 250)] flex flex-col items-center justify-center px-5 h-full">
            <div className="w-full bg-[#ffff] shadow-2xl py-8 px-3 text-center rounded-3xl 
            max-w-[350px] h-fit flex flex-col items-center justify-center lg:h-full lg:z-0 lg:max-w-[450px]
            lg:fixed lg:bottom-1 lg:rounded-md">
              <h1 className="text-[#1d254f] text-[22px] font-black">
                Participate in an event
              </h1>
              <img src="./handPhone.svg" alt="handphone-image" />
              <div
                className="flex gap-4 mt-6 py-2 px-3 max-w-[400px] mx-auto
          rounded-[30px] justify-center"
          style={{backgroundImage: 'linear-gradient(to right, #F59E0B, #F59E0B, #F6E05E)'}}
              >
                <input
                  type="text"
                  placeholder="Event code"
                  className="rounded-3xl h-[42px] px-4 outline-none border-gray border-2
                   focus:border-black w-2/3 shrink"
                />
                <Button
                  text={"Join!"}
                  classname={"px-4 rounded-[30px] py-0 font-extrabold"}
                />
              </div>
            </div>
          </div>
        </div>
  )
}

export default Auth