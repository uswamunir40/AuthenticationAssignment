import authRouter from "./auth/index.js";
import sendMailRoutes from "./sendMail/sendMailRoutes.js";
import studentRouter from "./student/index.js";
import fileUploadRouter from "./uploadFile/index.js";


const allRoutes = [authRouter, studentRouter, sendMailRoutes, fileUploadRouter];

export default allRoutes; 