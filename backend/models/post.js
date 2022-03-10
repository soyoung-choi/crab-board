module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
      title: {
        type: DataTypes.STRING(200)
      },
      image: {
        // 우리는 프론트에서 보내준 이미지를 Blob 타입으로 변환하여 서버에 저장합니다.
        type: DataTypes.BLOB("long"),
        allowNull: false
      }
    },
    {
      sequelize,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: 'posts',
      timestamps: false
    }
  );

  return Post;
};