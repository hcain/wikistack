var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

wikiRouter.get('/', function(req, res, next) {
    res.redirect('/');
});

wikiRouter.get('/add', function(req, res, next) {
    res.render('addpage')
});

wikiRouter.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  var page = Page.build({
    title: req.body.title,
    content: 'blah blah'
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save();
    //   -> after save -> res.redirect('/');
    res.json(page);
});

module.exports = wikiRouter;
