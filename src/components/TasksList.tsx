import TaskCard from "./TaskCard";
import { useContext } from "react";
import { TasksContext } from "./TasksContext";

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
                    <TaskCard item={task}/> 
                </div>
            ))}   
        </div>
    )
}
