const express = require("express");
const { body, param, validationResult, query } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// Reusable validation handler
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
};

// Validation rules
const createTaskValidation = [
    body("title").notEmpty().withMessage("Task title is required")
];

const updateTaskValidation = [
    param("id").isMongoId().withMessage("Invalid task ID"),
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("completed").optional().isBoolean().withMessage("Completed must be true or false")
];

const deleteTaskValidation = [
    param("id").isMongoId().withMessage("Invalid task ID")
];

// Routes
router.post("/tasks", auth, validate(createTaskValidation), createTask);
router.get(
    "/tasks",
    auth,
    getTasks
);
router.put("/tasks/:id", auth, validate(updateTaskValidation), updateTask);
router.delete("/tasks/:id", auth, validate(deleteTaskValidation), deleteTask);

module.exports = router;
