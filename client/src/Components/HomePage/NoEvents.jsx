import React from 'react';

const NoEvents = ({ userName, createNewEvent }) => {
  return (
    <div className='flex flex-col justify-center items-center text-center space-y-3 mt-10 w-full max-w-[850px] mx-auto'>
      <h1 className='text-2xl xs:text-3xl font-extrabold text-[#1d254f]'>Welcome to Wooclap, {userName.split(" ")[0]}! </h1>
      <p className='text-md xs:text-xl'>Create interactive presentations with Wooclap and make your classes and trainings memorable with just a few clicks. 🚀</p>
      <button className='py-2.5 w-56 bg-blue font-extrabold text-white rounded-3xl text-lg hover:scale-105' onClick={createNewEvent}>
        Create your first event</button>
    </div>
  )
}

export default NoEvents