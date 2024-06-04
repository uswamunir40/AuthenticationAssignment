import { Router } from "express";
import upload from "../../middleware/multer.js";
import fs from "fs";
import uploadonCloudinary from "../../controller/fileUpload/index.js";

const fileUploadRouter = Router();

fileUploadRouter.post("/upload", upload.single('file'), uploadonCloudinary);

export default fileUploadRouter;
