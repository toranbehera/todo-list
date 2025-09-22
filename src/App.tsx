import TasksProvider from "./components/TasksContext.tsx";
import CreateTask from "./components/CreateTask.tsx";
import TasksList from "./components/TasksList.tsx";
import'./App.css';

function App() {
  return (
    <TasksProvider>
      <CreateTask/>
      <TasksList/>
    </TasksProvider>
  )
}


export default App
