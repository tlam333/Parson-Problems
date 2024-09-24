import NavMenu from "../components/NavMenu";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import CodeBlock from "../components/CodeBlock.jsx";

const WorkPage = () => {
  let url = "http://localhost:3001/api/parsonProblem/"
  let [lines, updateLines] = useState([]);
  let [answerLines, updateAnswerLines] = useState([]);

  // ?topic=Correlation&theme=thomas
  const generateProblem = () => {
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'},
      body: JSON.stringify({topic : "Correlation", theme :"thomas"}),
    })
    .then((result) => {return result.json()})
    .then((data) => {updateLines(data.scrambledBlocks)})


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

  return (
    <div className="overflow-scroll bg-black h-lvh">
      <NavMenu />
      <div className="w-5/6 mx-auto">
        <h1 className="text-white text-2xl font-semibold">Prompt</h1>
        <div
          className="w-full h-10"
          style={{ backgroundColor: "#2d2e2e" }}
        ></div>
      </div>

      {/* The interactive section of the workspace page. */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="h-full w-full p-10 flex bg-black flex-col items-center space-between md:flex-row justify-between">
          <div className="flex-wrap bg-black w-full h-full rounded-md md:w-1/2">
            <h1 className="text-white text-2xl font-semibold">Select</h1>

            <Droppable droppableId="workspace-1">
              {(provided, snapshot) => (
                <div
                  className="flex flex-col overflow-auto gap-2 w-full h-5/6 mb-1 p-4" // Added p-4 for padding
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
            <button onClick = {generateProblem} className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded">
              Regenerate
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded">
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
                  className="flex flex-col overflow-auto gap-2 w-full h-5/6 bg-black mb-1 p-4" // Added p-4 for padding
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
                ></div>

          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default WorkPage;