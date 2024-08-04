import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import plusIcon from "../../assets/svgs/plusIcon.svg";
import mcqIcon from "../../assets/svgs/mcq.svg";
import pollIcon from "../../assets/svgs/poll.svg";
import openIcon from "../../assets/svgs/open.svg";
import sortingIcon from "../../assets/svgs/sorting.svg";
import slideIcon from "../../assets/svgs/slide.svg";

const questionType = [
  {
    type: "mcq",
    alt: "mcq-icon",
    icon: mcqIcon
  },
  {
    type: "poll",
    alt: "poll-icon",
    icon: pollIcon
  },
  {
    type: "open",
    alt: "open-icon",
    icon: openIcon
  },
  {
    type: "sorting",
    alt: "sorting-icon",
    icon: sortingIcon
  },
  {
    type: "slide",
    alt: "slide-icon",
    icon: slideIcon
  }
]

const QuestionsModal = ({ code, event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleCreateQuestion = () => {
    if (event.responses.length > 0) {
      return toast({
        status: "info",
        title: "New Question can't be Created",
        description: "Your event has already responses you have to reset your event if you want to add new questions",
        duration: 6000,
      });
    }
    else
      onOpen();
  };
  return (
    <>
      <button
        className="flex gap-1 border-transparent bg-blue px-4 py-2 rounded-3xl text-white font-black items-center 
      hover:scale-105 ml-auto my-4"
        onClick={handleCreateQuestion}
      >
        <img src={plusIcon} alt="plus-icon" className="w-6 h-6 text-blue" />
        <span>New question</span>
      </button>
        <Modal isOpen={isOpen} onClose={onClose} size={["xs", "md", "xl"]}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="text-center text-blue font-bold">
              Tools & Options
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 
            grid-rows-2">
                {questionType.map((ques, indx) => {
                  return (
                    <Link
                      className="flex flex-col items-center border-white border-2 cursor-pointer hover:border-blue p-2 h-[110px] rounded-2xl hover:text-blue gap-1 text-nowrap"
                      to={`/event/${code}/${ques.type}`}
                      key={indx}
                    >
                      <img
                        src={ques.icon}
                        alt={ques.alt}
                        className="h-[50px] w-[50px]"
                      />
                      <span className="font-bold">{ques.type.toUpperCase()}</span>
                    </Link>
                  )
                })}
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
    </>
  );
};

export default QuestionsModal;
