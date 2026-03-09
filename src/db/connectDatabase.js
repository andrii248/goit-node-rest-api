import sequelize from "./sequelize.js";
import "./associations.js";

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
  } catch (error) {
    console.log("Failed connecting database", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
