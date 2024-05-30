import userModel from "../../model/users/index.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const AuthController = {
    signup: async (req, res) => {
        try {
            const payload = req.body;
            const user = await userModel.findOne({
                where: {
                    email: payload.email

                }
            })

            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hpassword = await hash(payload.password, 10)
            await userModel.create({
                ...payload,
                password: hpassword
            })

            return res.status(201).json({ message: "User Registered Successfully" });

        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }

    },

    signin: async (req, res) => {
        try {
            const { email, password } = payload.body;
            const user = await userModel.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                return res.status(400).json("Invalid credentials");
            }

            const checkPassword = await compare(password, user.password);
            if (!checkPassword) {
                return res.status(400).json("Invalid credentials");
            }
            delete user.password;
            const data = {
                id: user.id,
                firstName: user.firstName,
                email: user.email
            }

            const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
                expiresIn: '1hr'
            })

            console.log(token);
            res.status(200).json({ data: user,token: token })


        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }




    }




    // signup: async (req, res) => {
    //     try {
    //         const payload = req.body;
    //         const userCheck = await userModel.findOne({
    //             where: {
    //                 email: payload.email
    //             }

    //         })
    //         if (userCheck) {
    //             return res.status(400).json({
    //                 message: "User already exists",
    //             });
    //         }

    //         const hpassword = await hash(payload.password, 10);
    //         console.log(hpassword)
    //         const user = await userModel.create({
    //             firstName: payload.firstName,
    //             lastName: payload.lastName,
    //             email: payload.email,
    //             password: hpassword,
    //         })
    //         console.log(user);
    //         res.json({ message: "User registered successfully" });

    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json({ message: "Internal Server Erorr" });

    //     }
    // },

    // signin: async (req, res) => {
    //     try {
    //         const payload = req.body;
    //         const userCheck = await userModel.findOne({
    //             where: {
    //                 email: payload.email
    //             }
    //         })
    //         if (!userCheck) {
    //             return res.status(400).json({ message: "Invalid Credentials" })
    //         }

    //         const comparePassword = await compare(
    //             payload.password, userCheck.password
    //         )
    //         if (!comparePassword) {
    //             return res.status(401).json({
    //                 message: "Invalid credentials",
    //             });
    //         }

    //         const data = {
    //             id: userCheck.id,
    //             email: userCheck.email,
    //             firstName: userCheck.firstName,
    //         };

    //         const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    //             expiresIn: "1h",
    //         });

    //         res.json({ data, token });

    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: "Internal Server Erorr" });

    //     }

    // }



};
export default AuthController;