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
            {tasks.map(({id, name, finished}: Task) => (
                <div key={id}>
                    <MemoizedCard id={id} name={name} finished={finished}/> 
                </div>
            ))}   
        </div>
    )
}
