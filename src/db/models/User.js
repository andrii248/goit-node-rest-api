import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import { emailRegex } from "../../constants/authConstants.js";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: emailRegex,
    },
    unique: { args: true, msg: "Oooops! Email already exists😒" },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    allowNull: false,
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  avatarURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// User.sync({ alter: true });

export default User;
