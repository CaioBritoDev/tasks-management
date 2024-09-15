import { createContext } from "react";

export const TasksContext = createContext({
  setTasks: () => {},
  tasks: [
    {
      id: 0,
      name: "",
      description: "",
      finished: false,
    },
  ],
});
