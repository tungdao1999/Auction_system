const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auction', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    itemId: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    startingPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    reservePrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    sellerId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'seller',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    presetDuration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mediaLink: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mediaType: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'auction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "itemId",
        using: "BTREE",
        fields: [
          { name: "itemId" },
        ]
      },
      {
        name: "auction_seller_FK",
        using: "BTREE",
        fields: [
          { name: "sellerId" },
        ]
      },
    ]
  });
};
