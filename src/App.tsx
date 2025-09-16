import Tasks from "./components/Tasks.tsx";
import TasksList from "./components/TasksList.tsx";
import'./App.css';

function App() {

  return (
    <>
      <Tasks>
        <TasksList/>
      </Tasks>
    </>
  )
}

export default App
