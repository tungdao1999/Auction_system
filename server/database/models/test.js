const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test', {
    TestName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TestTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    TestId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'test',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "TestId" },
        ]
      },
    ]
  });
};
