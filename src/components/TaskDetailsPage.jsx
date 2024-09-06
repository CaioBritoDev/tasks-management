import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { TasksContext } from "../utils/contexts/TasksContext";
import "./TaskDetailsPage.css"

export function TaskDetailsPage() {
  const { tasks, setTasks } = useContext(TasksContext);

  const { taskId } = useParams();

  const actualTask = tasks.find((task) => task.id === taskId);

  return (
    <div className="task-details-content">
      <Link to="/" className="close">
        X
      </Link>
      <h1>Task Details</h1>
      <div>
        <h2>Title</h2>
        <p>{actualTask.title}</p>
      </div>
      <div>
        <h2>Description</h2>
        <p>{actualTask.description}</p>
      </div>
      <div>
        <h2>Status</h2>
        {actualTask.finished ? (
          <p>
            Task already <strong>finished</strong>.
          </p>
        ) : (
          <p>
            <strong>Pending</strong> task.
          </p>
        )}
      </div>
      <div>
        <h2>Change Status</h2>
        <input
          id="status-task"
          type="checkbox"
          checked={actualTask.finished}
          onChange={(e) => {
            const finished = e.target.checked;
            setTasks((currentTasks) =>
              currentTasks.map((cTask) =>
                cTask.id === taskId ? { ...cTask, finished } : cTask
              )
            );
          }}
        />
      </div>
    </div>
  );
}
