var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var models = require('./models');
var router = require('./routes');
var wikiRouter = require('./routes/wiki');
var usersRouter = require('./routes/users');


nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('public'));

app.use('/', router);
app.use('/wiki/', wikiRouter);
app.use('/users/', usersRouter);

models.User.sync({})
.then(function () {
    return models.Page.sync({force: false});
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
