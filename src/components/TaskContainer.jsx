import { useContext } from "react";
import { TaskItem } from "./TaskItem";
import { TasksContext } from "../utils/contexts/TasksContext";
import { Link } from "react-router-dom";
import "./TaskContainer.css";

const basePathDeploy = "/tasks-management/";

export function TaskContainer() {
  const { tasks } = useContext(TasksContext);
  console.log(tasks)
  return (
    <>
      <Link to={basePathDeploy + "create"}>
        <button className="new-task">New Task</button>
      </Link>
      <h1>Old Tasks</h1>
      <div className="task-container">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
