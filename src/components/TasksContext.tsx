import { createContext, useCallback, useMemo, useState, type PropsWithChildren } from "react"
import useFetch from "../hooks/useFetch";
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

export const TasksContext = createContext<any>(null);
export const ReducersContext = createContext<any>(null);

export default function TasksProvider({children}: PropsWithChildren){
    const url = 'http://localhost:3000/tasks';
    const {data, refetch} = useFetch<Task>(url);
    const [count, setCount] = useState(0);

    const tasks = useMemo(() => data, [data]);

    const createTask = useCallback(
        async (task: Task) => {
            try {
                const validatedTask = taskSchema.cast(task);
                await taskSchema.validate(validatedTask);

                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(validatedTask),
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);    
                }
                
                refetch();
                return `Task ${validatedTask.name} successfully created!`;
            } catch (error: any) {
                if(error.name === "ValidationError"){
                    return error.message;
                }
                console.error(`Error: ${error.message}`);
            }
        },
        [url, refetch]
    );

    const deleteTask = useCallback(
        async (id: string) => {
        try {
            const response = await fetch(`${url}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error(`Response status: ${response.status}`);
            refetch();
            const result = await response.json();
            console.log(result);
        } catch (error: any) {
            console.error(error.message);
        }
        },
        [url, refetch]
    );

    const updateTask = useCallback(
        async (id: string, finished: boolean) => {
        try {
            const response = await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ finished }),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            refetch();
            console.log("Task updated");
        } catch (error) {
            console.error("Error updating task: ", error);
        }
        },
        [url, refetch]
    );

    const contextValue = useMemo(() => ({
        tasks
    }), [tasks]);

    const contextReducers = useMemo(() => ({
        createTask,
        deleteTask,
        updateTask,
    }), [createTask, deleteTask, updateTask])

    return (
        <div className="flex-col justify-self-center">  
            <button onClick={() => setCount(count + 1)}>{count}</button>
            <ReducersContext value={contextReducers}>
                <TasksContext value={contextValue}>
                    {children}
                </TasksContext>
            </ReducersContext>
        </div>
    )
}
