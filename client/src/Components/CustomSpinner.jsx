import React from 'react';
import { Spinner } from '@chakra-ui/react';

const CustomSpinner = ({color="blue.500"}) => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
    <Spinner
      color={color}
      boxSize="110px"
      speed="0.7s"
      thickness="5px"
    />
  </div>
  )
}

export default CustomSpinner;