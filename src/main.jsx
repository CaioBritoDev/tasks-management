import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { NewTaskForm } from "./components/NewTaskForm.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TaskDetailsPage } from "./components/TaskDetailsPage.jsx";
import { TaskContainer } from "./components/TaskContainer";
import { createUrl } from "./utils/linkHelpers.js";

const router = createBrowserRouter([
  {
    path: createUrl(),
    element: <App />,
    children: [
      {
        path: createUrl("/create"),
        element: <NewTaskForm />,
      },
      {
        path: createUrl("/task/:taskId"),
        element: <TaskDetailsPage />,
      },
      {
        index: true, // When the path does not match to any children, this is the default children of App
        element: <TaskContainer />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
