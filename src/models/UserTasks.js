"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTasks = void 0;
const mongoose_1 = require("mongoose");
const userTasksSchema = new mongoose_1.Schema({
    tg_id: { type: String, required: true, ref: 'User' },
    task_id: { type: String, required: true, ref: 'Tasks' },
    status: { type: String, enum: ['completed', 'pending', ''], default: '' },
});
exports.UserTasks = (0, mongoose_1.model)('UserTasks', userTasksSchema);
