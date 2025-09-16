import { createContext, useState } from "react"
import { object, string, boolean } from 'yup';
import useFetch from "../hooks/useFetch";

interface Task {
    id: string,
    name: string,
    finished: boolean
}

let taskSchema = object({
    id: string().default(() => crypto.randomUUID()), 
    name: string().required(),
    finished: boolean().default(false)
})

export const TasksContext = createContext<any>(null);

export default function Task({children}: any){
    const [inputText, setInputText] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    
    const url = 'http://localhost:3000/tasks';

    const {data: tasks, refetch} = useFetch<Task>(url);

    const createTask = async (task: Task) => {
        try{
            const validatedTask = taskSchema.cast(task);
            await taskSchema.validate(validatedTask);
            setMessage(`Task ${validatedTask.name} successfully created!`);
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(validatedTask)
            })
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }
            refetch();
        } catch(error: any){
            if(error.name === 'ValidationError'){
                setMessage(error.errors);
            }else{
                console.error(error.message);
            }
        }
    }

    const deleteTask = async (index: string) => {
        try{
            const response = await fetch(`${url}/${index}`, {
                method: 'DELETE'
            })
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }
            refetch();
            const result = await response.json();
            console.log(result);
        } catch(error: any){
            console.error(error.message);
        }
    }

    const updateTask = async (index: string, newValue: boolean) => {
        try{
            const response = await fetch(`${url}/${index}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'finished': newValue
                })
            });
            if(!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            refetch();
            console.log('task successfully updated');
        } catch(error){
            console.error('Error updating task: ', error);
        }
    }

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
                    onClick={() => createTask({name: inputText} as Task)}
                >
                    Create Task
                </button>
            </div>
            {message && 
                <div className="text-center">
                    {message}
                </div>
            }

            <TasksContext.Provider value={{tasks, deleteTask, updateTask}}>
                {children}
            </TasksContext.Provider>
        </div>

    )
}
