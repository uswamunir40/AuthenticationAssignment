// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs";
// // Configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET_KEY // Click 'View Credentials' below to copy your API secret
// });
// const uploadonCloudinary = async (localFilePath) => {
//     try {
//         const filePath = localFilePath.body.file
//         console.log("File path ", filePath);
//         console.log(typeof (filePath))
//         if (!filePath || typeof filePath !== 'string') {
//             console.log("Invalid file path");
//             return null;
//         }

//         const res = await cloudinary.uploader.upload(filePath, {
//             resource_type: 'auto'
//         });

//         console.log("File uploaded successfully", res.url);
//         return filePath;
//     } catch (error) {
//         console.error("Error uploading file to Cloudinary:", error);

//         // Check if localFilePath is provided and is a non-empty string
//         if (filePath && typeof filePath === 'string') {
//             try {
//                 fs.unlinkSync(filePath);
//                 console.log("Temporary file removed:", filePath);
//             } catch (unlinkError) {
//                 console.error("Error deleting temporary file:", unlinkError);
//             }
//         } else {
//             console.log("Invalid file path");
//         }

//         return null;
//     }
// };
// export default uploadonCloudinary;


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadonCloudinary = async (req, res) => {
    const localFilePath = req.body.file;

    try {
        console.log("File path ", localFilePath);
        console.log(typeof localFilePath);

        if (!localFilePath || typeof localFilePath !== 'string') {
            console.log("Invalid file path");
            return res.status(400).json({ error: "Invalid file path" });
        }

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        console.log("File uploaded successfully", result.url);
        return res.status(200).json({ url: result.url });
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);

        // Check if localFilePath is provided and is a non-empty string
        if (localFilePath && typeof localFilePath === 'string') {
            try {
                fs.unlinkSync(localFilePath);
                console.log("Temporary file removed:", localFilePath);
            } catch (unlinkError) {
                console.error("Error deleting temporary file:", unlinkError);
            }
        } else {
            console.log("Invalid file path");
        }

        return res.status(500).json({ error: "Error uploading file to Cloudinary" });
    }
};

export default uploadonCloudinary;


