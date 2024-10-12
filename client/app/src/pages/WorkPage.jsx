import NavHome from "../components/NavHome";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState, useEffect, useContext} from "react";
import { useLocation } from "react-router-dom";
import CodeBlock from "../components/CodeBlock.jsx";
import {AuthenticationContext} from "../contexts/AuthenticationContext.js";
import axios from 'axios';

const WorkPage = () => {
  let url = "http://localhost:3001/api/parsonProblem/";
  let [lines, updateLines] = useState([]);
  let [answerLines, updateAnswerLines] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [promptObj, setPromptObj] = useState({});
  const [isCorrect, setCorrect] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const { state, dispatch } = useContext(AuthenticationContext);
  
  // New state for timing
  const [elapsedTime, setElapsedTime] = useState(0); // Timer in seconds
  const [timerInterval, setTimerInterval] = useState(null); // Timer interval ID
  

  const getPastProblem = async () => {
    if (answerLines.length > 0 || lines.length > 0) {
      updateAnswerLines([]);
      updateLines([]);
    }

    if (location.state != null) {
      console.log(state.payload);
      setLoading(true);
      
      try {
        const response = await axios.get(`${url}${location.state.problem_id}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        const data = response.data;
        setPromptObj(data);
        updateLines(data.scrambledBlocks);
      } catch (err) {
        console.error('Error fetching past problem:', err);
      } finally {
        setLoading(false);
        startTimer(); // Start timer when loading finishes
      }
    }
  };

  const generateProblem = async () => {
    if (answerLines.length > 0 || lines.length > 0) {
      updateAnswerLines([]);
      updateLines([]);
    }

    if (location.state != null) {
      console.log(location.state.payload);
      setLoading(true);

      console.log(`Topic: ${location.state.topic.toString()}\nTheme: ${location.state.theme.toString()}`);

      try {
        const response = await axios.post(url, {
          topic: location.state.topic.toString(),
          theme: location.state.theme.toString()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });

        const data = response.data;
        setPromptObj(data);
        updateLines(data.scrambledBlocks);
      } catch (error) {
        console.error('Error generating problem:', error);
      } finally {
        setLoading(false);
        startTimer(); // Start timer when loading finishes
      }
    }
  };

  // New function to start the timer
  const startTimer = () => {
    const interval = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000); // Increment every second
    setTimerInterval(interval); // Store the interval ID
  };

  const handleSubmit = async () => {
    console.log(promptObj);
    let submitUrl = `http://localhost:3001/api/parsonProblem/submit/${promptObj._id}`;

    console.log(answerLines);

    try {
      console.log(`Time Taken: ${elapsedTime}`);
      const response = await axios.post(submitUrl, {
        codeBlocks: answerLines,
        elapsedTime: elapsedTime // Send the elapsed time with the submission
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      const data = response.data;

      if (data.passed === true) {
        setCorrect(true);
        setErrorMessage('');
      } else {
        setCorrect(false);
        setErrorMessage(data.terminalMessage.toString());
      }
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      clearInterval(timerInterval); // Stop the timer on submit
      setElapsedTime(0); // Reset elapsed time if needed
    }
  };

  const displayFeedback = () => {
    return (
      <div role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Correct</span>
      </div>
    ) 
  }

  const displayError = (errorMessage) =>{
    if (errorMessage.length > 0) {

      return (
        <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{errorMessage}</span>
      </div>
      )} 
    else {
      return (<div></div>)
    }

    
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (destination != null) {
      updateArrays(source, destination);
    } else {
      return;
    }
  };

  const updateArrays = (source, destination) => {
    let sourceItems, destinationItems;

    if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === "workspace-1") {
        sourceItems = answerLines;
        destinationItems = lines;

        let [item] = sourceItems.splice(source.index, 1);
        destinationItems.splice(destination.index, 0, item);
        updateLines(destinationItems);
        updateAnswerLines(sourceItems);
      } else if (destination.droppableId === "workspace-2") {
        sourceItems = lines;
        destinationItems = answerLines;

        let [item] = sourceItems.splice(source.index, 1);
        destinationItems.splice(destination.index, 0, item);
        updateLines(sourceItems);
        updateAnswerLines(destinationItems);
      }
    } else {
      if (source.droppableId === "workspace-1") {
        sourceItems = lines;

        let [item] = lines.splice(source.index, 1);
        sourceItems.splice(destination.index, 0, item);
        updateLines(sourceItems);
      } else if (source.droppableId === "workspace-2") {
        sourceItems = answerLines;

        let [item] = sourceItems.splice(source.index, 1);
        sourceItems.splice(destination.index, 0, item);
        updateAnswerLines(sourceItems);
      }
    }
  };

  useEffect(() => {
    if (location.state.problem_id != null){
      console.log(location.state.problem_id)
      getPastProblem();
    } else if (location.state != null){
      //setPromptData({ topic: location.state.topic, theme: location.state.subtopic });
      generateProblem(); // Call generateProblem when component mounts
    } else {
      setLoading(false);
    }
    
  }, []);

  return (
    <div className="overflow-scroll bg-black h-lvh">
      <NavHome />

      {/* Display loading animation while loading */}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        // Render this only when not loading
        <>
          <div className="w-5/6 mx-auto">
            <h1 className="text-white text-2xl font-semibold">Prompt</h1>
            <div className="w-full text-white h-20 overflow-auto" style={{ backgroundColor: "#2d2e2e" }}><p>{promptObj.prompt}</p></div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="h-full w-full p-10 flex bg-black flex-col items-center space-between md:flex-row justify-between">
              <div className="flex-wrap bg-black w-full h-full rounded-md md:w-1/2">
                <h1 className="text-white text-2xl font-semibold">Select</h1>

                <Droppable droppableId="workspace-1">
                  {(provided, snapshot) => (
                    <div
                      className="flex flex-col overflow-auto gap-2 w-full h-5/6 mb-1 p-4"
                      ref={provided.innerRef}
                      style={{ backgroundColor: "#2d2e2e" }}
                      {...provided.droppableProps}
                    >
                      {lines.map((line, index) => (
                        <Draggable draggableId={line} index={index} key={line}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <CodeBlock item={line} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                <br />
                <div className="flex justify-between w-full">
                  <button
                    onClick={generateProblem}
                    className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div className="flex-wrap bg-black w-full h-full md:w-2/5">
                <h1 className="text-white text-2xl font-semibold">
                  Drag & Drop here
                </h1>

                <Droppable droppableId="workspace-2">
                  {(provided, snapshot) => (
                    <div
                      className="flex flex-col overflow-auto gap-2 w-full h-5/6 bg-black mb-1 p-4"
                      style={{ backgroundColor: "#2d2e2e" }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {answerLines.map((line, index) => (
                        <Draggable draggableId={line} index={index} key={line}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <CodeBlock item={line} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <br />
                <h1 className="text-white text-2xl font-semibold">Feedback</h1>
                <div
                  className="flex flex-col overflow-auto gap-2 w-full h-1/6 mb-1 p-4"
                  style={{ backgroundColor: "#2d2e2e" }}
                >
                  {isCorrect ? displayFeedback() : displayError(errorMessage)}
                </div>
              </div>
            </div>
          </DragDropContext>
        </>
      )}
    </div>
  );
};

export default WorkPage;
