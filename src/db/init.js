import sequelize from "./config.js";
import userModel from "../model/users/index.js";



const syncDb = async () => {
    await sequelize.sync({ alter: true, force: false });
    await userModel.sync({ alter: true, force: false });
    console.log("Models created");
}

export default syncDb;