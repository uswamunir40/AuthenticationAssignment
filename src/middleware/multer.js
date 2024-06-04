import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {

        // cb(null, file.originalname)
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage,
    //  fileFilter: function (req, file, cb) {
    //     checkFileType(file, cb);
// }
});

export default upload;




