import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
} from '@chakra-ui/react';
import deleteIcon from "../../assets/svgs/deleteIcon.svg";
import { useDisclosure } from '@chakra-ui/react';
import React from 'react';

export default function DeleteQuestionMenu({ questId, deleteQuestion }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    function handleDeleteEvent() {
        deleteQuestion(questId);
        onClose();
    }
    return (
        <>
            <img src={deleteIcon} alt='delete-icon' className="w-5 h-6 hover:text-red-500 cursor-pointer hover:scale-125 relative sm:top-[-1px] xs:left-2"
                onClick={onOpen} />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered

            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='xl' fontWeight='extrabold' mb={'-15px'} textAlign={'center'} textColor={'#3182CE'} >
                            Delete Confirmation
                        </AlertDialogHeader>

                        <AlertDialogBody textAlign={'center'}>
                            {`Are you sure you want to delete this question? `}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='blue' onClick={handleDeleteEvent} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}