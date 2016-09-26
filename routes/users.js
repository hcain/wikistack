var express = require('express');
var usersRouter = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

usersRouter.get('/', function(req, res, next) {
    Page.findAll()
    .then(function(users){
        res.render('index', {users: users});
    })
});

module.exports = usersRouter;
