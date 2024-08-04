import React from 'react'

const Responded = ({name}) => {
  return (
    <div className='flex flex-col justify-center items-center text-blue py-20 px-3'>
        <h1 className='text-[30px] font-black text-center'>
            {`${name}, `} Your Response has successfully submitted
        </h1>
        <h2 className='text-[30px] font-black mb-6 underline text-red-400 mt-2'>Thank You!!</h2>
        <img src={'/prayer-hands.png'} alt="prayer-hands" height={"200px"} 
        width={"200px"}/>
    </div>
  )
}

export default Responded;