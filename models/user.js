module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define(
    "Users",
    {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    },
    {
      timestamps: false
    }
  );
  return Users;
};
