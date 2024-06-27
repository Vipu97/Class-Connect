import React from 'react'

const ZeroQuestions = () => {
  return (
    <div className='py-20 flex flex-col justify-center items-center gap-y-3 mx-4'>
        <h1 className='text-xl font-black xs:text-2xl sm:text-3xl text-blue text-center w-full max-w-[650px]'>This Event does not contains any questions or content to display.</h1>
        <p className='text-md xs:text-xl text-medium text-gray-450 text-center'>If you have any questions or need further information, please contact the event organizer.</p>
        <p className='text-2xl xs:text-3xl text-gray-450 font-black mt-4'>Thank You 🙏</p>
    </div>
  )
}

export default ZeroQuestions