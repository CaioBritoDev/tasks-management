import { useContext, useState } from "react";
import { TasksContext } from "../utils/contexts/TasksContext";
import { useNavigate, Link } from "react-router-dom";
import "./NewTaskForm.css";
import { createUrl, selectEndpoint } from "../utils/linkHelpers";
import axios from "axios";

export function NewTaskForm() {
  const { setTasks } = useContext(TasksContext);

  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    finished: false,
  });

  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const isValid = newTask.name && newTask.description;

  return (
    <form
      className="new-task"
      onSubmit={async(e) => {
        e.preventDefault();
        setSubmitting(true);
        
        if (isValid) {
          // Setting the ID in the new task
          // If here, instead of creating this new variable, I update the newTask variable with the new counter,
          // it will not work, since it's a asychronus proccess, and will not await for that change in id
          // so the id gets duplicated
          async function addTask() {
            try {
              const response = await axios.post(selectEndpoint('/tasks/create/'), newTask);
              return response.data;
            } catch (error) {
              // Error handling -> show the message to user
              console.log(error.message); 
            }
          }  
          
          const taskToAdd = await addTask();

          // Setting a new task in the array
          setTasks((tasks) => [taskToAdd, ...tasks]);

          // Reset form fields
          setNewTask({
            name: "",
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
        <input
          type="text"
          placeholder="Name"
          id="name"
          value={newTask.name}
          onChange={(e) => {
            setSubmitting(false);
            setNewTask((task) => ({ ...task, name: e.target.value }));
          }}
        />
      </div>
      <div>
        <input
          type="text"
          id="description"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => {
            setSubmitting(false);
            setNewTask((task) => ({ ...task, description: e.target.value }));
          }}
        />
      </div>
      <div className="finished-input-section">
        <label htmlFor="finished">Finished...?</label>
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
      {submitting && !isValid && <p>Please, fill name and description!</p>}
    </form>
  );
}
