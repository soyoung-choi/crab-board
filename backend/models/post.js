'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      contents: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      image: {
        // 우리는 프론트에서 보내준 이미지를 Blob 타입으로 변환하여 서버에 저장합니다.
        type: DataTypes.BLOB("long"),
      }
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
      underscored: true,
      timestamps: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  )
  return Post
}

