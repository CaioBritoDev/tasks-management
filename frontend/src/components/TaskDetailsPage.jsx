import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { TasksContext } from "../utils/contexts/TasksContext";
import "./TaskDetailsPage.css";
import { createUrl, selectEndpoint } from "../utils/linkHelpers";
import axios from "axios";

export function TaskDetailsPage() {
  const { tasks, setTasks } = useContext(TasksContext);

  const { taskId } = useParams();

  const actualTask = tasks.find((task) => task.id == taskId);

  return (
    <div className="task-details-content">
      <Link to={createUrl()} className="close">
        X
      </Link>
      <h1>Task Details</h1>
      <div>
        <h2>Name</h2>
        <p>{actualTask.name}</p>
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
          onChange={async (e) => {
            const finished = e.target.checked;

            async function setTaskStatus() {
              try {
                const body = { finished };
                await axios.patch(
                  selectEndpoint(`/tasks/${actualTask.id}`),
                  body
                );
              } catch (error) {
                // Error handling -> show to user
                console.log(error.message);
              }
            }

            await setTaskStatus();

            setTasks((currentTasks) =>
              currentTasks.map((cTask) =>
                cTask.id == taskId ? { ...cTask, finished } : cTask
              )
            );
          }}
        />
      </div>
    </div>
  );
}
