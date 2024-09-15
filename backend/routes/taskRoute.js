const route = require("express").Router();
const taskController = require("../controllers/taskController");

route.get("/", taskController.getAllTasks);
route.get("/:taskId", taskController.getTaskById);
route.post("/create", taskController.createTask);
route.put("/:taskId", taskController.updateTask);
route.patch("/:taskId", taskController.setTaskStatus);
route.delete("/:taskId", taskController.removeTask);

module.exports = route;
