const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './users.db'
});

module.exports = sequelize.define('user', {
    id: {
        primaryKey: true,
        type: Sequelize.NUMBER
    },
    email: {
        type: Sequelize.STRING
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    },
}, {});

sequelize.sync();

