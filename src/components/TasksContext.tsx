import { createContext, type PropsWithChildren } from "react"
import useTasks from "../hooks/useTasks";

export const TasksContext = createContext<any>(null);
export const ReducersContext = createContext<any>(null);

export default function TasksProvider({children}: PropsWithChildren){
    const {contextValue, contextReducers} = useTasks();

    return (
        <div className="flex-col">  
            <ReducersContext value={contextReducers}>
                <TasksContext value={contextValue}>
                    {children}
                </TasksContext>
            </ReducersContext>
        </div>
    )
}
