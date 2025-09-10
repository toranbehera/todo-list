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
    const url = 'http://localhost:3000/tasks'

        const [t, setTasks] = useState(tasks);

        useEffect(() => {
            setTasks(tasks);
        }, [tasks])

        const deleteTask = async (index: string) => {
        try{
            const response = await fetch(`${url}/${index}`, {
                method: 'DELETE'
            })
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
        } catch(error: any){
            console.error(error.message);
        }
    }

    return (
        <div>
            <div>
                {t.map(({id, name}) => (
                    <div key={id}>
                        <TaskCard item={name} handleClick={() => deleteTask(`${id}`)}/> 
                    </div>
                ))}   
            </div>
        </div>
    )
}
