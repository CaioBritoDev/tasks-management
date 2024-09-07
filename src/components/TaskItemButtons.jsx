import "./TaskItemButtons.css";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { TasksContext } from "../utils/contexts/TasksContext";
import { Link } from "react-router-dom";

const basePathDeploy = "/tasks-management/";

export default function TaskItemButtons({ setIsEditing, newDataTask }) {
  const { setTasks } = useContext(TasksContext);
  const [label, setLabel] = useState("Edit");

  return (
    <>
      <Link to={`${basePathDeploy}/task/${newDataTask.id}`}>
        <button className="view-task buttons-group">View</button>
      </Link>
      <button
        className="edit-task buttons-group"
        onClick={() => {
          if (label === "Edit") {
            setIsEditing(true);
            setLabel("Save");
          } else {
            setIsEditing(false);
            setTasks((currentTasks) =>
              currentTasks.map((currentTask) =>
                currentTask.id === newDataTask.id ? newDataTask : currentTask
              )
            );
            setLabel("Edit");
          }
        }}
      >
        {label}
      </button>
      <button
        className="remove-task buttons-group"
        onClick={() => {
          setTasks((currentTasks) =>
            currentTasks.filter(
              (currentTask) => currentTask.id !== newDataTask.id
            )
          );
        }}
      >
        Remove
      </button>
    </>
  );
}

TaskItemButtons.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
  newDataTask: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    finished: PropTypes.bool.isRequired,
  }).isRequired,
};
