import TasksProvider from "./components/TasksContext.tsx";
import CreateTask from "./components/CreateTask.tsx";
import TasksList from "./components/TasksList.tsx";
import'./App.css';

function App() {
  return (
    <div className="flex justify-center">
        <TasksProvider>
        <CreateTask/>
        <TasksList/>
      </TasksProvider> 
    </div>
    
  )
}


export default App
