import { useContext } from "react";
import { TasksContext } from "./TasksContext";
import MemoizedCard from "./TaskCard";

interface Task {
    id: string,
    name: string,
    finished: boolean
}

export default function TasksList(){
    const {tasks} = useContext(TasksContext);
    return (
        <div>
            {tasks.map((task: Task) => (
                <div key={task.id}>
                    <MemoizedCard item={task}/> 
                </div>
            ))}   
        </div>
    )
}
