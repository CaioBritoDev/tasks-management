import { useContext, useState } from "react";
import { TasksContext } from "../utils/contexts/TasksContext";
import { useNavigate, Link } from "react-router-dom";
import "./NewTaskForm.css";
import { v4 as uuidv4 } from "uuid";
import { createUrl } from "../utils/linkHelpers";

export function NewTaskForm() {
  const { setTasks } = useContext(TasksContext);

  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    description: "",
    finished: false,
  });

  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const isValid = newTask.title && newTask.description;

  return (
    <form
      className="new-task"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitting(true);
        if (isValid) {
          // Setting the ID in the new task
          // If here, instead of creating this new variable, I update the newTask variable with the new counter,
          // it will not work, since it's a asychronus proccess, and will not await for that change in id
          // so the id gets duplicated
          const taskToAdd = {
            ...newTask,
            id: uuidv4(),
          };

          // Setting a new task in the array
          setTasks((tasks) => [taskToAdd, ...tasks]);

          // Reset form fields
          setNewTask({
            id: "",
            title: "",
            description: "",
            finished: false,
          });

          navigate(createUrl());
        }
      }}
    >
      <h1>New Task</h1>
      <Link to={createUrl()} className="close">
        X
      </Link>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={newTask.title}
          onChange={(e) => {
            setSubmitting(false);
            setNewTask((task) => ({ ...task, title: e.target.value }));
          }}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={newTask.description}
          onChange={(e) => {
            setSubmitting(false);
            setNewTask((task) => ({ ...task, description: e.target.value }));
          }}
        />
      </div>
      <div className="finished-input-section">
        <label htmlFor="finished">Finished</label>
        <input
          type="checkbox"
          id="finished"
          value={newTask.finished}
          onChange={(e) => {
            setNewTask((task) => ({ ...task, finished: e.target.checked }));
          }}
        />
      </div>
      <button type="submit" className="create-task">
        Create
      </button>
      {submitting && !isValid && <p>Please, fill title and description!</p>}
    </form>
  );
}
