"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.createTask = exports.getTasks = void 0;
const UserTasks_1 = require("../models/UserTasks");
const Tasks_1 = require("../models/Tasks");
const User_1 = require("../models/User");
const getTasks = async (request, response) => {
    try {
        const user = parseInt(request.params.id);
        const tasks = await UserTasks_1.UserTasks.find({ tg_id: user }).populate('task_id');
        return response.json(tasks.map((task) => {
            return {
                title: task.task_id.task_name,
                description: task.task_id.description,
                status: task.status,
                link: task.task_id.url,
                img: task.task_id.img,
                price: task.task_id.price,
                extra: task.task_id.extra,
                task_id: task._id,
            };
        }));
    }
    catch (error) {
        console.error('Error getting tasks:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTasks = getTasks;
const createTask = async (request, response) => {
    try {
        const { task_name, description, status = 'starting', url, img, price, } = request.body;
        const task = await Tasks_1.Tasks.create({
            task_name,
            description,
            status,
            url,
            img,
            price,
        });
        const users = await User_1.User.find();
        for (const user of users) {
            await UserTasks_1.UserTasks.create({
                tg_id: user.tg_id,
                task_id: task._id,
                status: '',
            });
        }
        return response.json(task);
    }
    catch (error) {
        console.error('Error creating task:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};
exports.createTask = createTask;
const updateTask = async (request, response) => {
    const { task_id } = request.params;
    const { status } = request.body;
    try {
        await UserTasks_1.UserTasks.findOneAndUpdate({ _id: task_id }, { status });
        return response.json({ status: 'success' });
    }
    catch (error) {
        console.error('Error updating task:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateTask = updateTask;
