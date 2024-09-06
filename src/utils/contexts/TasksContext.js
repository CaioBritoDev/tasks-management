import { createContext } from "react";

export const TasksContext = createContext({
  setTasks: () => {},
  tasks: [
    {
      id: 0,
      title: "",
      description: "",
      finished: false,
    },
  ],
});
