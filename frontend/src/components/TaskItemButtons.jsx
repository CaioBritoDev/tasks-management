import "./TaskItemButtons.css";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { TasksContext } from "../utils/contexts/TasksContext";
import { Link } from "react-router-dom";
import { createUrl, selectEndpoint } from "../utils/linkHelpers";
import axios from "axios";

export default function TaskItemButtons({ setIsEditing, newDataTask }) {
  const { setTasks } = useContext(TasksContext);
  const [label, setLabel] = useState("Edit");

  return (
    <>
      <Link to={createUrl(`/task/${newDataTask.id}`)}>
        <button className="view-task buttons-group">View</button>
      </Link>
      <button
        className="edit-task buttons-group"
        onClick={async() => {
          if (label === "Edit") {
            setIsEditing(true);
            setLabel("Save");
          } else {
            setIsEditing(false);

            async function editTask() {
              try {
                await axios.put(selectEndpoint(`/tasks/${newDataTask.id}`), newDataTask);
              } catch (error) {
                // Error hadling -> show to user
                console.log(error.message); 
              }
            }

            await editTask();

            setTasks((currentTasks) =>
              currentTasks.map((currentTask) =>
                currentTask.id == newDataTask.id ? newDataTask : currentTask
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
        onClick={async() => {
          async function removeTask() {
            try {
              await axios.delete(selectEndpoint(`/tasks/${newDataTask.id}`));
            } catch (error) {
              // Error hadling -> show to user
              console.log(error.message); 
            }
          }

          await removeTask();

          setTasks((currentTasks) =>
            currentTasks.filter(
              (currentTask) => currentTask.id != newDataTask.id
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    finished: PropTypes.bool.isRequired,
  }).isRequired,
};
