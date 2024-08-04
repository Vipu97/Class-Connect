import React from 'react';
import { Link } from 'react-router-dom';
import leftArrowIcon from "../../assets/svgs/leftArrow.svg";

const BackButton = ({eventCode}) => {
  return (
    <Link className="flex items-center gap-2 px-6" to={`/event/${eventCode}`}>
        <img src={leftArrowIcon} alt='left-arrow' className='w-5 h-6'/>
        <span className="font-black text-gray-600 text-[17px]">
        Back</span>
      </Link>
  )
}

export default BackButton