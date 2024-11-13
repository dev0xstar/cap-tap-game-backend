"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.updateUser = exports.setPubkey = exports.downFullEnergy = exports.updateDate = exports.getUserByTgId = exports.getUserById = exports.getUsers = void 0;
const User_1 = require("../models/User");
const getUsers = async (_, response, next) => {
    try {
        const users = await User_1.User.find().sort({ mount: -1 });
        return response.json(users);
    }
    catch (error) {
        console.error('Error getting users:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUsers = getUsers;
const getUserById = async (request, response) => {
    const id = parseInt(request.params.id);
    try {
        const user = await User_1.User.findOne({ _id: id });
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        return response.json(user);
    }
    catch (error) {
        console.error('Error getting user by id:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserById = getUserById;
const getUserByTgId = async (request, response) => {
    const id = request.body.user;
    try {
        const user = await User_1.User.findOne({ tg_id: id });
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }
        return response.json(user);
    }
    catch (error) {
        console.error('Error getting user by tg_id:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserByTgId = getUserByTgId;
const updateDate = async (request, response) => {
    const { user } = request.body;
    const currentDateTime = new Date();
    try {
        const currentUser = await User_1.User.findOneAndUpdate({ tg_id: user }, { rate_date: currentDateTime }, { new: true });
        return response.json(currentUser);
    }
    catch (error) {
        console.error('Error updating user data:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateDate = updateDate;
const downFullEnergy = async (request, response) => {
    const { user } = request.body;
    try {
        const currentUser = await User_1.User.findOne({ tg_id: user });
        if (currentUser) {
            currentUser.full_energy = currentUser.full_energy - 1;
            await currentUser.save();
        }
        return response.json(currentUser);
    }
    catch (error) {
        console.error('Error updating user data:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};
exports.downFullEnergy = downFullEnergy;
const setPubkey = async (request, response) => {
    const { user, address } = request.body;
    try {
        const currentUser = await User_1.User.findOne({ tg_id: user });
        if (currentUser) {
            currentUser.public_key = address;
            await currentUser.save();
        }
        return response.json(currentUser);
    }
    catch (error) {
        console.error('Error updating user data:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};
exports.setPubkey = setPubkey;
const updateUser = async (request, response) => {
    const { user, mount, balance } = request.body;
    const currentDateTime = new Date();
    try {
        const currentUser = await User_1.User.findOne({ tg_id: user });
        if (currentUser) {
            currentUser.mount = Number(mount) + Number(currentUser.mount);
            currentUser.balance = Number(balance) + Number(currentUser.balance);
            currentUser.date = currentDateTime;
            await currentUser.save();
        }
        return response.json(currentUser);
    }
    catch (error) {
        console.error('Error updating user data:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateUser = updateUser;
const createUser = async (request, response) => {
    const { user } = request.body;
    const currentDateTime = new Date();
    try {
        const existingUser = await User_1.User.findOne({ tg_id: user });
        if (existingUser) {
            return response.status(400).json({ error: 'User already exists' });
        }
        const createdUser = await User_1.User.create({
            tg_id: user,
            mount: 0,
            balance: 0,
            date: currentDateTime,
        });
        return response.json(createdUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};
exports.createUser = createUser;
