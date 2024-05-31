import sequelize from "./config.js";
import userModel from "../model/users/index.js";
import tokenModel from "../model/auth/token.js";
import StudentModel from "../model/student/index.js";



const syncDb = async () => {
    await sequelize.sync({ alter: true, force: false });
    await userModel.sync({ alter: true, force: false });
    await tokenModel.sync({ alter: true, force: false })
    await StudentModel.sync({ alter: true });
    console.log("Models created");
}

export default syncDb;