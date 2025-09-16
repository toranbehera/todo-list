import { createContext } from "react"
import useFetch from "../hooks/useFetch";

interface Task {
    id: string,
    name: string,
    finished: boolean
}

export const TasksContext = createContext<any>(null);

export default function TasksProvider({children}: any){
    const url = 'http://localhost:3000/tasks';
    const {data: tasks, refetch} = useFetch<Task>(url);

    const createTask = async (task: Task) => {
        try{        
            const response = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task)
            })
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }
            refetch();
        } catch(error: any){
            console.error(`Error: ${error.message}`);
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
        <TasksContext value={{tasks, createTask, deleteTask, updateTask}}>
            <div className="flex-col justify-self-center">
                {children}
            </div>
        </TasksContext>
    )
}
