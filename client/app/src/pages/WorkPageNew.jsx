import NavHome from "../components/NavHome";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState, useEffect, useContext} from "react";
import { useLocation } from "react-router-dom";
import CodeBlock from "../components/CodeBlock.jsx";
import {AuthenticationContext} from "../contexts/AuthenticationContext.js";
import axios from 'axios';
import CodeInput from "../components/CodeInput.jsx";

const WorkPageNew = () => {
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
        <div className="flex flex-col gap-2 h-svh pt-10 pb-10 pl-10 pr-10">
            {/*Prompt*/}
            <div className="mockup-code flex h-1/4 w-full overflow-y-scroll">
                <pre data-prefix=">" className="text-success"><code className="text-wrap">{promptObj.prompt}</code></pre>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-2 h-full">
                    <Droppable droppableId="workspace-1">
                        {(provided, snapshot) => (
                            <div
                                className="mockup-code flex flex-col h-full w-1/2"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className="absolute top-3 right-20 flex justify-end w-full h=1/8 bg-transparent text-slate-500">drag.py</div>
                                {lines.map((line, index) => (
                                    <Draggable draggableId={line} index={index} key={line}>
                                        {(provided, snapshot) => (
                                            <pre
                                                className="flex items-center"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <code className="text-wrap">{line}</code>
                                            </pre>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {/* Drop Area */}
                    <Droppable droppableId="workspace-2">
                        {(provided, snapshot) => (
                            <div
                                className="mockup-code flex flex-col h-full w-1/2"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className="absolute top-3 right-20 flex justify-end w-full h=1/8 bg-transparent text-slate-500">drop.py</div>
                                {answerLines.map((line, index) => (
                                    <Draggable draggableId={line} index={index} key={line}>
                                        {(provided, snapshot) => (
                                            <pre
                                                className="flex items-center"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <code className="text-wrap">{line}</code>
                                            </pre>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>

            {/*FEEDBACK*/}
            <CodeInput 
              answerLines={answerLines} 
              elapsedTime={elapsedTime} 
              setElapsedTime={setElapsedTime} 
              timerInterval={timerInterval} 
              problemId={promptObj._id}
            />
        </div>

        )}
    </div>
  );
};

export default WorkPageNew;
