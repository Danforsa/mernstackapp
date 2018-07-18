var mongoose = require('mongoose');

var TaskSchema = mongoose.Schema({
    title: String,
    description: String,
    user: String,
    completed: String,
    start_date: { type: Date, default: Date.now },
    end_date: {type: Date}
});

module.exports = mongoose.model('Tasks', TaskSchema);
