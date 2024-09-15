import { TasksContext } from "./utils/contexts/TasksContext";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { selectEndpoint } from "./utils/linkHelpers";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);

  async function getAllTasks() {
    const route = selectEndpoint('/tasks/');
    try {
      const response = await axios.get(route);
      setTasks(response.data);
    } catch (error) {
      console.log(error.message);  
    }
  }

  useEffect(() => {
    getAllTasks();
  }, [])

  return (
    <>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <Outlet />
      </TasksContext.Provider>
    </>
  );
}
