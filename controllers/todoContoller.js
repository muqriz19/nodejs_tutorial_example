let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let urlEncode = bodyParser.urlencoded({
    extended: false
});

mongoose.connect('mongodb+srv://test:test@cluster0.6te5s.mongodb.net/<test>?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

var todoSchema = new mongoose.Schema({
    item: String
});

let Todo = mongoose.model('Todo', todoSchema);

// let itemOne = Todo({item: 'test'}).save(function(err) {
//     if (err) {
//         throw err;
//     }
//     console.log('item saved');
// });

// let data = [{
//         item: 'get milk'
//     },
//     {
//         item: 'get money'
//     },
//     {
//         item: 'get code'
//     },
// ]

module.exports = function (app) {
    app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
            if (err) throw err;

            res.render('todo', {
                todos: data
            });
        });
    });

    app.post('/todo', urlEncode, function (req, res) {
        // console.log(req.body)
        // data.push(req.body);

        var newTodo = new Todo(req.body).save(function(err, data) {
            if (err) throw err;

            res.json(data);
        })
    });

    app.delete('/todo/:item', function (req, res) {
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
            if (err) throw err;

            res.json(data);
        });

        // data = data.filter(function (todo) {
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });

        // res.json(data);
    });
};