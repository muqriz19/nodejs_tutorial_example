let express = require('express');
let todoController = require('./controllers/todoContoller');

let app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));

todoController(app);

app.listen(3000);
console.log('PORT RUNNING', 3000);