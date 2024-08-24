import NavMenu from "../components/NavMenu"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useCallback } from "react"
import CodeBlock from '../components/CodeBlock.jsx'
import {useState} from 'react'

const WorkPage = () => {
    // What I expect to recieve from the API call a problem, with its content
    const problemObject = {id: 'problem-1', content: ['Test line 1', 'Test line 2', 'Test line 3']}
    
    // track line order states to ensure that component re-renders for each dnd
    let [lines, updateLines] = useState(problemObject.content);
    let [answerLines, updateAnswerLines] = useState([]);

    // Responders for DragContext state updates
    // Only on drag end is actually a required responder/hook
    const onDragEnd = (result) => {

        const {source, destination} = result
        updateArrays(source, destination)

    }

    const updateArrays = (source, destination) => {
        let sourceItems, destinationItems;

        if (source.droppableId != destination.droppableId) {
            if (destination.droppableId == 'workspace-1') {
                sourceItems = answerLines;
                destinationItems = lines;

                let [item] = sourceItems.splice(source.index, 1)
                destinationItems.splice(destination.index, 0, item)
                updateLines(destinationItems)
                updateAnswerLines(sourceItems)

            } else if (destination.droppableId == 'workspace-2'){
                sourceItems = lines;
                destinationItems = answerLines;

                let [item] = sourceItems.splice(source.index, 1)
                destinationItems.splice(destination.index, 0, item)
                updateLines(sourceItems)
                updateAnswerLines(destinationItems)
                console.log("answer", answerLines)

            }
        } else {
            if (source.droppableId == 'workspace-1') {
                sourceItems = lines

                let [item] = lines.splice(source.index, 1)

                sourceItems.splice(destination.index, 0, item)
                updateLines(sourceItems)
                
            } else if (source.droppableId == 'workspace-2'){
                sourceItems = answerLines

                let [item] = sourceItems.splice(source.index, 1)
                sourceItems.splice(destination.index, 0, item)
                updateAnswerLines(sourceItems)
            }
        }
    }

    return (
        <div className="overflow-scroll bg-black h-lvh">
            <NavMenu />
            <div className="w-5/6 mx-auto">
                <button className="display-block mb-2.5 text-black bg-orange-500 w-1/9 h-1/3 rounded-md font-bold p-2">Prompt</button>
                <div className="w-full h-10 bg-slate-800"></div>
            </div>

            {/* The interactive section of the workspace page. */}
            <DragDropContext 
                onDragEnd = {onDragEnd}
            >

            <div className="h-full w-full mt-10 p-10 flex  bg-black
            flex-col items-center space-between md:flex-row justify-between gap-12">
                <div className="flex-wrap bg-black w-full h-full rounded-md md:w-2/5">
                    <button className="display-block mb-1.5 text-black 
                    bg-orange-500 w-1/9 rounded-md font-bold p-2">Question</button>

                    <Droppable droppableId="workspace-1">
                        {(provided, snapshot) => 
                                (<div className="flex flex-col gap-2 border-orange-500 border-2 w-full h-5/6 bg-black rounded-md mb-1"
                                    ref = {provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                        {
                                            lines.map((line, index) => (
                                                
                                                    <Draggable draggableId={line} index={index} key={line}>
                                                        {(provided, snapshot) => (
                                                            <div 
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
            
                                                                <CodeBlock item={line}/>
                                                            </div>
                                                        )}
                                                        
                                                    </Draggable>
                                                
                                            ))
                                        }
                                {provided.placeholder}
                                </div>                       
                        )}
                    
                    </Droppable>

                    <button className="display-block mb-2.5 text-black 
                    bg-orange-500 w-1/9 rounded-md font-bold p-2">Regenerate</button>
                </div>


                <div className="flex-wrap bg-black w-full h-full rounded-md md:w-2/5">
                    <button className="display-block mb-1.5 text-black 
                    bg-orange-500 w-1/9 rounded-md font-bold p-2">Question</button>

                    <Droppable droppableId="workspace-2">
                        {(provided, snapshot) => 
                                (<div className="flex flex-col gap-2 border-orange-500 border-2 w-full h-5/6 bg-black rounded-md mb-1"
                                    ref = {provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                        {
                                            answerLines.map((line, index) => (
                                                
                                                    <Draggable draggableId={line} index={index} key={line}>
                                                        {(provided, snapshot) => (
                                                            <div 
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
            
                                                                <CodeBlock item={line}/>
                                                            </div>
                                                        )}
                                                        
                                                    </Draggable>
                                                
                                            ))
                                        }
                                {provided.placeholder}
                                </div>)                 
                        }
                    
                    </Droppable>

                    <button className="display-block mb-2.5 text-black 
                    bg-orange-500 w-1/9 rounded-md font-bold p-2">Regenerate</button>
                </div>
            </div>


            </DragDropContext>

        </div>
    )
}

export default WorkPage