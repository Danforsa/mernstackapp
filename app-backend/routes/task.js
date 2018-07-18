module.exports = function(app) {
/*It is important to use the app object here. One reason for this is that in app.js
we have specified the app object will use body-parser.
The statement app.use(bodyParser.json()); takes the data stored in the body
of the HTTP reqest and parsers it into JSON so that we can retrieve and work with this data */

    var tasks = require('../controllers/task.controller.js');

    // Create a new Task
    app.post('/task', tasks.create);

    // Retrieve all Tasks
    app.get('/task', tasks.findAll);

    app.get('/task/:id', tasks.find);

    app.post('/task/:id', tasks.update);

    app.post('/task/complete/:id', tasks.complete);

}
