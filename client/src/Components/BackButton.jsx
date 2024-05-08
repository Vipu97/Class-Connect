import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = ({eventCode}) => {
  return (
    <Link className="flex items-center gap-2 px-6" to={`/event/${eventCode}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        <span className="font-black text-gray-600 text-[17px]">
        Back</span>
      </Link>
  )
}

export default BackButton