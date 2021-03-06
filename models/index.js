var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        notEmpty: true
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
},
{getterMethods:
    {route: function() { return  '/wiki/' + this.urlTitle }},
    hooks: {
        beforeValidate: function(page){
                if (page.title) {
                    page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
                } else {
                    // Generates random 5 letter string
                    page.urlTitle = Math.random().toString(36).substring(2, 7);
                }
        }
    }
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
        allowNull: false
    }
});

Page.belongsTo(User, { as: 'author' });


module.exports = {
  Page: Page,
  User: User
};
