import { useState } from "react"
import TasksList from "./TasksList";
import { object, string, boolean } from 'yup';
import useFetch from "../hooks/useFetch";

interface Task {
    id: string|undefined,
    name: string,
    finished: boolean|undefined
}

let taskSchema = object({
    id: string().default(() => crypto.randomUUID()), 
    name: string().required(),
    finished: boolean().default(false)
})

export default function Task(){
    const [inputText, setInputText] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const url = 'http://localhost:3000/tasks'

    const createTask = async (task: Task) => {
        try{
            const validatedTask = await taskSchema.validate(task);

            setMessage(`Task ${validatedTask.name} successfully created!`);
            
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(validatedTask)
            })
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }
        } catch(error: any){
            
            if(error.name === 'ValidationError'){
                setMessage(error.errors);
            }else{
                console.error(error.message);
            }
        }
    }

    const {data: tasks} = useFetch<Task>(url);

    return (
        <div className="flex-col justify-self-center">
            <div className="flex justify-center w-fit gap-4 hover:outline-1 outline-gray-400 p-5 m-5 shadow-lg">
                <input 
                    className="border-1 rounded-md p-2 shadow-xs"
                    onChange={(e) => setInputText(e.target.value)} 
                    placeholder='enter'
                />
                <button 
                    className="
                        bg-green-700 
                        shadow-md
                        hover:bg-green-800
                        focus:outline-1
                        focus:outline-gray-600
                        active:opacity-75
                        p-2 
                        rounded-lg 
                        text-white
                    "
                    onClick={() => createTask({name: inputText, id: undefined, finished: false})}
                >
                    Create Task
                </button>
            </div>
            {message && 
                <div className="text-center">
                    {message}
                </div>
            }
            <TasksList tasks={tasks}/>
        </div>
    )
}
