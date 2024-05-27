import userModel from "../../model/users/index.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const AuthController = {

    signup: async (req, res) => {
        try {
            const payload = req.body;
            const userCheck = await userModel.findOne({
                where: {
                    email: payload.email
                }

            })
            if (userCheck) {
                return res.status(400).json({
                    message: "User already exists",
                });
            }

            const hpassword = await hash(payload.password, 10);
            console.log(hpassword)
            const user = await userModel.create({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: hpassword,
            })
            console.log(user);
            res.json({ message: "User registered successfully" });

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Erorr" });

        }
    },

    signin: async (req, res) => {
        try {
            const payload = req.body;
            const userCheck = await userModel.findOne({
                where: {
                    email: payload.email
                }
            })
            if (!userCheck) {
                return res.status(400).json({ message: "Invalid Credentials" })
            }

            const comparePassword = await compare(
                payload.password, userCheck.password
            )
            if (!comparePassword) {
                return res.status(401).json({
                    message: "Invalid credentials",
                });
            }

            const data = {
                id: userCheck.id,
                email: userCheck.email,
                firstName: userCheck.firstName,
            };

            const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
                expiresIn: "1h",
            });

            res.json({ data, token });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Erorr" });

        }

    }

};
export default AuthController;