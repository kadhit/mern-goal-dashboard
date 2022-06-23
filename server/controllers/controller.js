// @desc    GetGoals
// @route   GET /api/goals
// @access  Private

const getGoals = (req, res) => {
    res.status(200).json({message: 'Get Goals'});
};

// @desc    SetGoals
// @route   POST /api/goals
// @access  Private

const setGoals = (req, res) => {
    res.status(200).json({message: 'Set Goals'});
};

// @desc    UpdateGoal
// @route   PUT /api/goals/:id
// @access  Private

const updateGoal = (req, res) => {
    res.status(200).json({message: `Update Goal ${req.params.id}`});
};

// @desc    DeleteGoal
// @route   DELETE /api/goals/:id
// @access  Private

const deleteGoal = (req, res) => {
    res.status(200).json({message: `Delete goal ${req.params.id}`});
};

module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
};