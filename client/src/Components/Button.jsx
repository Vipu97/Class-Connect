import React from 'react'

const Button = ({text,classname,onClick}) => {
  return (
    <button className = {`bg-blue text-white hover:bg-white 
    border-2 border-[#578ff0cc]
    hover:border-[#146affcc] rounded-3xl hover:text-blue ${classname}`} 
    onClick={onClick}>
        {text}
    </button>
  )
}

export default Button