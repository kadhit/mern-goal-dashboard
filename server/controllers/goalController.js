const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    GetGoals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
});

// @desc    SetGoals
// @route   POST /api/goals
// @access  Private
const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field.');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });

    res.status(200).json(goal);
});

// @desc    UpdateGoal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorised');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updatedGoal);
});

// @desc    DeleteGoal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }
    
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorised');
    }
    await goal.remove();

    res.status(200).json({id: req.params.id});
});

module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
};