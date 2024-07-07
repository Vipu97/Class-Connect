import React, { useEffect,useState } from 'react'
import CustomSpinner from '../CustomSpinner';

const NoQuestion = () => {
  const [wait,setWait] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    },1500);
  },[]);
  if(wait)
    return <CustomSpinner />;
  return (
    <div className='mt-16 flex flex-col gap-y-1'>
        <p className='text-2xl font-black xs:text-3xl text-blue text-center'>No question are added to the event</p>
        <p className='text-gray-350 text-center text-sm xs:text-lg font-medium'>🚀Start by clicking new question button to create your first question.</p>
    </div>
  )
}

export default NoQuestion;