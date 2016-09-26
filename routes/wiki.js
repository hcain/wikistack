var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

wikiRouter.get('/', function(req, res, next) {
    Page.findAll()
    .then(function(pages){
        res.render('index', {pages: pages});
    })
});

wikiRouter.get('/add', function(req, res, next) {
    res.render('addpage')
});

wikiRouter.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.render('wikipage', {foundPage: foundPage});
  })
  .catch(next);
});

wikiRouter.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
User.findOrCreate({
    where:{
        name: req.body.name,
        email: req.body.email
    }
})
.then(function (values) {
    var user = values[0];

    var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });

   return  page.save().then(function(page){
        return page.setAuthor(user);
});
  
  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
 
  })
    //   -> after save -> res.redirect('/');
   .then(function(page){
        res.redirect(page.route);
    })
    .catch(next);
})

module.exports = wikiRouter;
