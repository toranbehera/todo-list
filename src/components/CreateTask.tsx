import { useContext, useState } from "react"
import { ReducersContext } from "./TasksContext";

interface Task {
    id: string,
    name: string,
    finished: boolean
}

export default function CreateTask(){
    const [inputText, setInputText] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const {createTask} = useContext(ReducersContext);

    const handleClick = async (task: Task) => {
        setMessage(createTask(task));
    }

    return (
        <div className="sticky top-20 pt-5 bg-white">
            <div className="flex justify-center gap-4 hover:outline-1 outline-gray-400 p-5 shadow-lg ">
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
        </div>
        
    )
}
