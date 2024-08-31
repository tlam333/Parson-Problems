import NavMenu from "../components/NavMenu"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useCallback } from "react"
import CodeBlock from '../components/CodeBlock.jsx'
import {useState} from 'react'

const WorkPage = () => {
    // What I expect to recieve from the API call a problem, with its content
    const problemObject = {id: 'problem-1', content: 
            ['Test line 1', 'Test line 2', 'Test line 3',
             'Test line 4', 'Test line 5', 'Test line 6',
             'Test line 7', 'Test line 8', 'Test line 9',
             'Test line 10', 'Test line 11', 'Test line 12',
             'Test line 13', 'Test line 14', 'Test line 15',
             'Test line 16', 'Test line 17', 'Test line 18',
            ]}
    
    // track line order states to ensure that component re-renders for each dnd
    let [lines, updateLines] = useState(problemObject.content);
    let [answerLines, updateAnswerLines] = useState([]);

    // Responders for DragContext state updates
    // Only on drag end is actually a required responder/hook
    const onDragEnd = (result) => {

        const {source, destination} = result
        if (destination != null){
            updateArrays(source, destination)
        } else {
            return
        }
        

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
            <div className="mt-4 w-5/6 mx-auto">
                <button className="display-block mb-2.5 text-black bg-orange-500 w-1/9 h-1/3 border-r-4 border-black font-bold p-2">Description</button>
                <button className="display-block mb-2.5 text-black bg-orange-500 w-1/9 h-1/3 border-r-4 border-black font-bold p-2">Hints</button>
                <button className="display-block mb-2.5 text-black bg-orange-500 w-1/9 h-1/3 border-r-4 border-black font-bold p-2">Prompt</button>
                <div className="w-full h-10 bg-slate-800"></div>
            </div>

            {/* The interactive section of the workspace page. */}
            <DragDropContext 
                onDragEnd = {onDragEnd}
            >

            <div className="h-full w-full mt-10 p-10 flex  bg-black
            flex-col items-center space-between md:flex-row justify-between gap-12">
                <div className="flex-wrap bg-black w-full h-full rounded-md md:w-2/5">
                    <button className="display-block mb-1.5 mr-1 text-black 
                    bg-orange-500 w-1/9 rounded-md font-bold p-2">Question</button>

                    <button className="display-block mb-2.5 text-black 
                    bg-orange-500 w-1/9 rounded-md font-bold p-2">Regenerate</button>

                    <Droppable droppableId="workspace-1">
                        {(provided, snapshot) => 
                                (<div className="flex flex-col overflow-auto gap-2 border-orange-500 border-2 w-full h-5/6 bg-black rounded-md mb-1"
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

                </div>


                <div className="flex-wrap bg-black w-full h-full rounded-md md:w-2/5">
                    <button className="display-block mb-1.5 mr-1 text-black 
                    bg-orange-500 w-1/9 rounded-md font-bold p-2">Answer</button>
                    <button className="display-block mb-1.5 mr-1 text-black 
                    bg-orange-500 w-1/9 rounded-md font-bold p-2">Solutions</button>
                    <button className="display-block mb-2.5 text-black 
                    bg-orange-500 w-1/9 rounded-md font-bold p-2">Submit</button>

                    <Droppable droppableId="workspace-2">
                        {(provided, snapshot) => 
                                (<div className="flex flex-col overflow-auto gap-2 border-orange-500 border-2 w-full h-5/6 bg-black rounded-md mb-1"
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


                </div>
            </div>
            </DragDropContext>

        </div>
    )
}

export default WorkPage