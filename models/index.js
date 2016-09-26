var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
    },
    urlTitle: {
        type: Sequelize.STRING,
        isUrl: true,
        allowNull: false,
        notEmpty: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        notEmpty: true,
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
},
{getterMethods: 
    {route: function() { return  '/wiki/' + this.urlTitle }}
}
);

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false,
        notEmpty: true
    }
});


module.exports = {
  Page: Page,
  User: User
};