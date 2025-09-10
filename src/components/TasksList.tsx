import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

interface Task {
    id: string|undefined,
    name: string,
    finished: boolean|undefined
}

interface TasksListProps {
    tasks: Task[]
}

export default function TasksList({tasks}: TasksListProps){
        const [t, setTasks] = useState(tasks);

        useEffect(() => {
            setTasks(tasks);
        }, [tasks])

    return (
        <div>
            {t.map((task) => (
                <div key={task.id}>
                    <TaskCard item={task}/> 
                </div>
            ))}   
        </div>
    )
}
