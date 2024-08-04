import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    
  } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
  
export default function EditQuestionModal({questId,questType,event}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
  
    function handleEditQuestion(){
        if(event.responses.length > 0){
            onOpen();
        }else{
            navigate(`/event/edit/${questId}/${questType}`);
        }
    }
    return (
      <> 
        <button className="h-[35px] py-1.5 px-4 font-black text-gray-500 bg-transparent hover:text-blue rounded-3xl hover:bg-white" onClick={handleEditQuestion}>
            Edit
        </button>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
                <h1 className='text-blue font-bold text-center mb-[-10px]'>Question can't be edited</h1>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            You can't edit a question which has already received responses from the audience. You need to reset your event in order to edit a question this will remove all the existing responses of the event.
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }