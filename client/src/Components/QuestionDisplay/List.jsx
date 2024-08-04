import React from 'react';
import Slide from "./Slide";
import PollOrMcq from "./PollOrMcq";
import Open from "./Open";
import Sort from "./Sort";

const List = ({questions,submitAnswer,response,setResponse}) => {
    return (
        <div>
            <main className="flex flex-col justify-center gap-20 mt-10 px-2">
                {questions.map((quest, index) => {
                    return (
                        <div
                            className="flex flex-col justify-center gap-4"
                            key={quest._id}
                        >
                            <div className="flex justify-center">
                                <h1 className="text-2xl font-extrabold text-center max-w-[1000px] px-2">
                                    {quest.type !== "slide" && quest.question}
                                </h1>
                            </div>

                            {quest.type === "open" && (
                                <Open
                                    quest={quest}
                                    response={response}
                                    setResponse={setResponse}
                                    index={index}
                                />
                            )}

                            {quest.type === "sorting" && (
                                <Sort
                                    options={quest.options}
                                    response={response}
                                    setResponse={setResponse}
                                    idx={index}
                                />
                            )}

                            {(quest.type === "poll" || quest.type === "mcq") && (
                                <PollOrMcq
                                    index={index}
                                    options={quest.options}
                                    response={response}
                                    setResponse={setResponse}
                                />
                            )}
                            {quest.type === "slide" && (
                                <Slide
                                    title={quest.question}
                                    content={quest.answers}
                                    photo={quest.photos}
                                />
                            )}
                        </div>
                    );
                })}
            </main>
            <footer className="my-10 flex justify-center">
                <button
                    className="w-full py-2 px-5 text-blue font-black text-2xl max-w-[400px] shadow-question rounded-3xl border-2 border-gray-300 hover:scale-105 hover:border-blue hover:border-2"
                    onClick={submitAnswer}
                >
                    Submit
                </button>
            </footer>
        </div>
    )
}

export default List