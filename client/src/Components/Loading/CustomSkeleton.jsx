import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CustomSkeleton = () => {
  return (
    <div className="flex flex-col mt-10">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex items-center py-3 border-t-[1px] hover:bg-[#b8d4f5]">
            <Skeleton circle={true} height={24} width={24} className="mr-2 bg-gray-300" />
            <Skeleton width={250} height={24} className='bg-gray-300' />
            <div className="flex gap-7 text-gray-500 items-center ml-auto">
              <Skeleton width={100} height={24} className='bg-gray-300'/>
              <Skeleton width={40} height={24} className='bg-gray-300'/>
            </div>
          </div>
        ))}
    </div>
  )
}

export default CustomSkeleton;
