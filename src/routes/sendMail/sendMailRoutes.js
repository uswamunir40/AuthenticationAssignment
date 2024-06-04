import sendMail from "../../controller/mail/sendMails.js";
import { Router } from "express";

const sendMailRoutes = Router();
sendMailRoutes.get("/mail", sendMail.getMail);

export default sendMailRoutes;
