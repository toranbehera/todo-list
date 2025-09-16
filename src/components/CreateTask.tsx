import { useContext, useState } from "react"
import { TasksContext } from "./TasksContext";
import { object, string, boolean } from "yup";

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

export default function CreateTask(){
    const [inputText, setInputText] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const {createTask} = useContext(TasksContext);

    const handleClick = async (task: Task) => {
        try{
            const validatedTask = taskSchema.cast(task);
            await taskSchema.validate(validatedTask);
            setMessage(`Task ${validatedTask.name} successfully created!`);
            createTask(validatedTask);
        } catch(error: any){
           if(error.name === 'ValidationError'){
                setMessage(error.errors);
            }else{
                console.error(error.message);
            }
        }
    }

    return (
        <>
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
                    onClick={() => handleClick({name: inputText} as Task)}
                >
                    Create Task
                </button>
            </div>
            {message && 
                <div className="text-center">
                    {message}
                </div>
            }
        </>
        
    )
}
