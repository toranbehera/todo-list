import Tasks from "./components/TasksContext.tsx";
import TasksList from "./components/TasksList.tsx";
import CreateTask from "./components/CreateTask.tsx";
import'./App.css';

function App() {

  return (
    <>
      <Tasks>
        <CreateTask/>
        <TasksList/>
      </Tasks>
    </>
  )
}

export default App
