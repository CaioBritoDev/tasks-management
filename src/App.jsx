import { TasksContext } from "./utils/contexts/TasksContext";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <Outlet />
      </TasksContext.Provider>
    </>
  );
}
