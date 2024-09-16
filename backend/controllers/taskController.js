const { pool } = require("../database/database.js");

exports.createTask = async (req, res) => {
  try {
    const { name, description, finished, userId=1 } = req.body;

    if (!name || !description || typeof finished !== "boolean")
      return res.status(422).json({
        message: "All fields are required!",
      });

    // First, see if the user_id provided is related to some user
    const userRelated = await pool.query(
      `
      SELECT
        COUNT(*) AS counter
      FROM
        "user"
      WHERE
        id = $1
      `,
      [userId]
    );

    const counter = parseInt(userRelated.rows[0].counter);

    if (!counter)
      return res.status(404).json({
        message: "There is no user who belongs to the userId provided.",
      });

    const createdTask = await pool.query(
      `INSERT INTO task
        (name, description, finished, user_id)
      VALUES
        ($1, $2, $3, $4)
      RETURNING id, name, description, finished`,
      [name, description, finished, userId]
    );

    return res.status(201).json(createdTask.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) return res.status(422).json({ message: "Provide a task id." });
    const task = await pool.query(
      `
      SELECT
        *
      FROM
        task
      WHERE
        id = $1
      `,
      [taskId]
    );
    if (task.rowCount) return res.status(200).json(task.rows[0]);
    else
      return res
        .status(404)
        .json({ message: "There is no task for the id provided." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { name, description, finished, userId=1 } = req.body;

  try {
    if (
      !name ||
      !description ||
      typeof finished !== "boolean" ||
      !taskId
    )
      return res.status(422).json({
        message: "All fields are required!",
      });

    // First, see if the user_id provided is related to some user
    const userRelated = await pool.query(
      `
      SELECT
        COUNT(*) AS counter
      FROM
        "user"
      WHERE
        id = $1
      `,
      [userId]
    );

    const counter = parseInt(userRelated.rows[0].counter);

    if (!counter)
      return res.status(404).json({
        message: "There is no user who belongs to the userId provided.",
      });

    const taskRelated = await pool.query(`
      SELECT EXISTS(
        SELECT
          *
        FROM
          task
        WHERE
          id = $1
        )
    `, [taskId])

    if (!taskRelated.rows[0].exists) return res.status(404).json({ message: "There is no task for the id provided."});

    const timeStamp = new Date().toISOString();

    const updatedTask = await pool.query(
      `
      UPDATE
        task
      SET
        name = $1, description = $2, finished = $3, user_id = $4, updated_at = $5
      WHERE
        id = $6
      RETURNING id, name, description, finished
      `,
      [name, description, finished, userId, timeStamp, taskId]
    );
    return res.status(200).send(updatedTask.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.setTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) return res.status(422).json({ message: "Provide a task id." });
    const { finished } = req.body;
    console.log(taskId, finished)
    if (typeof finished !== "boolean")
      return res
        .status(422)
        .json({ message: "Your status is not defined as boolean!" });
    const task = await pool.query(
      `
      SELECT
        *
      FROM
        task
      WHERE
        id = $1
      `,
      [taskId]
    );
    if (!task.rowCount)
      return res
        .status(404)
        .json({ message: "There is no task for the id provided." });

    const timeStamp = new Date().toISOString();

    const updatedTask = await pool.query(
      `
        UPDATE
          task
        SET
          finished = $1, updated_at = $2
        WHERE 
          id = $3
      `,
      [finished, timeStamp, taskId]
    );
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const allTasks = await pool.query(`
      SELECT
        *
      FROM
        task
      ORDER BY
        updated_at
      DESC
      `);

    return res.status(200).json(allTasks.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.removeTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    if (!taskId) return res.status(422).json({ message: "Provide a task id." });

    // First, see if the task with the id exists
    const taskRelated = await pool.query(
      `
      SELECT
        COUNT(*) AS counter
      FROM
        task
      WHERE
        id = $1
      `,
      [taskId]
    );

    const counter = parseInt(taskRelated.rows[0].counter);

    if (!counter)
      return res.status(404).json({
        message: "There is no task who belongs to the taskId provided.",
      });

    const deletedTask = await pool.query(
      `
      DELETE FROM
        task
      WHERE
        id = $1
      `,
      [taskId]
    );

    return res.status(200).send();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};
