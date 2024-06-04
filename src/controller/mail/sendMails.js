import nodemailer from "nodemailer";

const sendMail = {
    getMail: async (req, res) => {
        let testAcount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'nikolas99@ethereal.email',
                pass: 'td4TUEywudYBuNc8pe'
            }
        });

        const info = await transporter.sendMail({
            from: '"Uswa Munir" <uswa@gmail.com>', // sender address
            to: "uswa40munir@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ info });


    }
};

export default sendMail;