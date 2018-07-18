var Task = require('../models/task.model.js');

exports.create = function(req, res) {
    // Create and Save a new Task

    console.log(req.body);


    if(!req.body) {
      /*test that the request contains content in the body. When testing this with Postman
      make sure that 1) you select the post method on the URL http://localhost:3001/task (remember we specified that
    we are using port 3001 in the package.json file).2) That you specify keys 'title' and 'description' with
    corresponding values in the body of the request. Use x-www-form-urlencoded. Postman will then send an HTTP request
    to your app which contains the relevant data about the task you want to add to your database.  */
        res.status(400).send({message: "Task cannot be empty"});
    }else {
      /* Since you have called this function using app.post (see /routes/task.js) and since your app uses
      body-parser middleware (app.use(bodyParser.json());) the body has been parsed into a JSON object.
      That is why your code will recognise req.body.title and req.body.description. */
    var task = new Task({title: req.body.title || "Untitled Task", description: req.body.description, user: req.body.user || "Nobody", completed: req.body.completed || 'false'});
    task.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the task."});
        } else {
          res.json(data);
          //  res.send(data);
        }
    });
  }
};

exports.update = function(req, res) {
    if(!req.body) {
      res.status(400).send({message: "Task cannot be empty"});
    }else {
      var query = {'_id':req.body._id};
      Task.update(query, req.body, {upsert:false}, function(err, doc){
        if (err){
          console.log(err);
          return res.send(500, { error: err });
        }
        return res.send("succesfully saved");
      });
    }
};

exports.complete = function(req, res) {
  var query = {'_id':req.params.id};

  Task.update(query, { $set: { completed: true} }, {upsert:false}, function(err, doc){
    if (err){
      console.log(err);
      return res.send(500, { error: err });
    }
    return res.send("succesfully complete");
  });
};

exports.findAll = function(req, res) {
  var query = {};
  if(req.query.filter){
    var filter = req.query.filter;

    if(filter === 'completed'){
      query = { completed: "true" };
    }

    if(filter === 'incomplete'){
      query = { completed: "false" };
    }

    if(filter === 'overdue'){
      query = { end_date: { "$lte" : new Date() } };
    }
  }

  if(req.query.deadline){
    query = { end_date: new Date(req.query.deadline) };
  }

  // Retrieve and return all notes from the database.
  Task.find(query, function(err, tasks){
      if(err) {
        console.log(err);
          res.status(500).send({message: "Some error occurred while retrieving tasks."});
      } else {
        //  res.send(tasks);
        res.json(tasks);
      }
  });
};

exports.find = function(req, res) {
  console.log('in find');

  Task.findOne({ '_id': req.params.id }, function(err, task){
        if(err) {
          console.log(err);
            res.status(500).send({message: "Some error occurred while retrieving tasks."});
        } else {
          res.json(task);
        }
    });
};
