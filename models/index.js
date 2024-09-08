const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(require('../config/config.json').development);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, DataTypes);
db.Expense = require('./expense')(sequelize, DataTypes);
db.Category = require('./category')(sequelize, DataTypes);
db.PaymentMethod = require('./paymentMethod')(sequelize, DataTypes);
db.Budget = require('./budget')(sequelize, DataTypes);

// Define associations
db.User.hasMany(db.Expense, { foreignKey: 'user_id' });
db.User.hasMany(db.Category, { foreignKey: 'user_id' });
db.User.hasMany(db.PaymentMethod, { foreignKey: 'user_id' });
db.User.hasMany(db.Budget, { foreignKey: 'user_id' });

db.Category.belongsTo(db.User, { foreignKey: 'user_id' });
db.Expense.belongsTo(db.User, { foreignKey: 'user_id' });
db.Expense.belongsTo(db.Category, { foreignKey: 'category_id' });
db.PaymentMethod.belongsTo(db.User, { foreignKey: 'user_id' });
db.Budget.belongsTo(db.User, { foreignKey: 'user_id' });
db.Budget.belongsTo(db.Category, { foreignKey: 'category_id' });

module.exports = db;
