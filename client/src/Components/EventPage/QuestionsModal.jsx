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

const QuestionsModal = ({ code, event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleCreateQuestion = () => {
    if (event.responses.length > 0) {
      return toast({
        status: "info",
        title: "New Question can't be Created",
        description : "Your event has already responses you have to reset your event if you want to add new questions",
        duration : 6000,
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-blue"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 grid-rows-2">
              <Link
                className="flex flex-col items-center border-white border-2 cursor-pointer hover:border-blue p-2 h-[110px] rounded-2xl hover:text-blue gap-1 text-nowrap"
                to={`/event/${code}/mcq`}
              >
                <img
                  src="/mcq.svg"
                  alt="mcq-image"
                  className="h-[50px] w-[50px]"
                />
                <span className="font-bold">MCQ</span>
              </Link>
              <Link
                className="flex flex-col items-center border-white border-2 cursor-pointer hover:border-blue p-2 h-[110px] rounded-2xl hover:text-blue gap-1 text-nowrap"
                to={`/event/${code}/poll`}
              >
                <img
                  src="/poll.svg"
                  alt="poll-image"
                  className="h-[50px] w-[50px]"
                />
                <span className="font-bold">POLL</span>
              </Link>
              <Link
                className="flex flex-col items-center border-white border-2 cursor-pointer hover:border-blue p-2 h-[110px] rounded-2xl hover:text-blue gap-1 text-nowrap"
                to={`/event/${code}/open`}
              >
                <img
                  src="/open.svg"
                  alt="open-image"
                  className="h-[50px] w-[50px]"
                />
                <span className="font-bold">Open question</span>
              </Link>
              <Link
                className="flex flex-col items-center border-white border-2 cursor-pointer hover:border-blue p-2 h-[110px] rounded-2xl hover:text-blue gap-1 text-nowrap"
                to={`/event/${code}/sorting`}
              >
                <img
                  src="/sorting.svg"
                  alt="sorting-image"
                  className="h-[50px] w-[50px]"
                />
                <span className="font-bold">Sorting</span>
              </Link>
              <Link
                className="flex flex-col items-center border-white border-2 cursor-pointer hover:border-blue p-2 h-[110px] rounded-2xl hover:text-blue gap-1 text-nowrap"
                to={`/event/${code}/slide`}
              >
                <img
                  src="/slide.svg"
                  alt="slide-image"
                  className="h-[50px] w-[50px]"
                />
                <span className="font-bold">Slide</span>
              </Link>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionsModal;
