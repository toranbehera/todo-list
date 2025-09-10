import { useState, useEffect } from "react"
import TestingCard from "./testingCard";
import { Formik } from "formik";

interface Task {
    id: number,
    title: string,
    finished: boolean
}

export default function TestingField(){
    const [inputText, setInputText] = useState<string>('');
    const [list, setList] = useState<string[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const url = 'http://localhost:3000/tasks'

    const handleClick = (text: string) => {
        setList([...list, text]);
    }

    const deleteTask = async (index: number) => {
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

    const createTask = async (task: Task) => {
        try{
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(task)
            })
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }
        } catch(error: any){
            console.error(error.message)
        }
    }

    const fetchData = async (url: string) => {
        try{
          const response = await fetch(url);  
          if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
          }

          const result = await response.json();
          console.log(result);
          setTasks(result);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchData(url);
    })

    return (
        <div className="flex-col justify-self-center">
            <div className="flex gap-4 hover:outline-1 outline-gray-400 p-5 m-5 shadow-lg">
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
                    onClick={() => handleClick(inputText)}
                >
                    Create Task
                </button>
            </div>
            <div>
                {tasks.map(({id, title}) => (
                    <div key={id}>
                        <TestingCard item={title} index={id} handleClick={() => deleteTask(id)}/> 
                    </div>
                ))}   
            </div>
        </div>
    )
}
