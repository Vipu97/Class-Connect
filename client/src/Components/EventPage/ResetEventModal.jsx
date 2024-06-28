import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
} from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';
import React from 'react';

export default function ResetEventModal({handleResetEvent}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    function handleReset() {
        handleResetEvent();
        onClose();
    }
    return (
        <>
            <button
              className="bg-white py-2 px-3 xs:px-5 rounded-3xl font-extrabold hover:bg-[#f2f5f7] hover:scale-105"
              onClick={onOpen}
            >
              Reset Event
            </button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered

            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='xl' fontWeight='extrabold' mb={'-15px'} textAlign={'center'} textColor={'#3182CE'} >
                            Reset Confirmation
                        </AlertDialogHeader>

                        <AlertDialogBody textAlign={'center'}>
                            {`Are you sure you want to reset this event? It will remove all responses your event have so far`}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='blue' onClick={handleReset} ml={3}>
                                Reset
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}