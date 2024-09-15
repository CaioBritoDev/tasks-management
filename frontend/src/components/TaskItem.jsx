import PropTypes from "prop-types";
import doneIcon from "../assets/done-icon.png";
import TaskItemButtons from "./TaskItemButtons";
import "./TaskItem.css";
import { useState } from "react";

export function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDataTask, setNewDataTask] = useState({
    id: task.id,
    name: task.name,
    description: task.description,
    finished: task.finished,
  });

  return (
    <div className="task-item">
      <div className="task-content">
        <div className="task-name">
          <p>
            <strong>Name</strong>
          </p>
          {isEditing ? (
            <input
              type="text"
              value={newDataTask.name}
              onChange={(e) => {
                setNewDataTask((currentState) => ({
                  ...currentState,
                  name: e.target.value,
                }));
              }}
            />
          ) : (
            <p>{task.name}</p>
          )}
        </div>
        <div className="task-description">
          <p>
            <strong>Description</strong>
          </p>
          {isEditing ? (
            <input
              type="text"
              value={newDataTask.description}
              onChange={(e) => {
                setNewDataTask((currentState) => ({
                  ...currentState,
                  description: e.target.value,
                }));
              }}
            />
          ) : (
            <p>{task.description}</p>
          )}
        </div>
      </div>
      <div className="task-buttons">
        <TaskItemButtons
          setIsEditing={setIsEditing}
          newDataTask={newDataTask}
        />
        <div className="task-finished">
          {task.finished && (
            <img className="task-finished-image" src={doneIcon} />
          )}
        </div>
      </div>
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    finished: PropTypes.bool.isRequired,
  }).isRequired,
};
