import { useCallback, useMemo } from "react";
import { taskAdded, taskDeleted, taskUpdated, type Task } from "../app/features/tasks/tasksSlice";
import { useAppDispatch } from "./reduxHooks";
import useFetch from "./useFetch";
import { object, string, boolean } from "yup";
import { nanoid } from "@reduxjs/toolkit";

let taskSchema = object({
    id: string().default(() => nanoid()), 
    name: string().required(),
    finished: boolean().default(false)
})

export default function useTasks(){
        const url = 'http://localhost:3000/tasks';
        const {data, refetch} = useFetch<Task>(url);
    
        const dispatch = useAppDispatch();
    
        const tasks = useMemo(() => data, [data]);
    
        const createTask = useCallback(
            async (task: Task) => {
                try {
                    const cleanedTask = taskSchema.cast(task);
                    await taskSchema.validate(cleanedTask);
    
                    const response = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(cleanedTask),
                    });
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);    
                    }
                    
                    dispatch(taskAdded(cleanedTask));
                    refetch();
                    return `Task ${cleanedTask.name} successfully created!`;
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
    
                dispatch(taskDeleted(id));
                refetch();
                const result = await response.json();
                console.log(result);
            } catch (error: any) {
                console.error(error.message);
            }
            },
            [url]
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
    
                dispatch(taskUpdated({id, finished}))
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

        return {contextReducers, contextValue};
}
