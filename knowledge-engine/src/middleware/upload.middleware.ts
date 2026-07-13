import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
    destination(req, file, cd) {
        cd(null, "uploads/")
    },
    filename(req, file, cd) {
        const uniquname = `${Date.now()}-${file.originalname}`;
        cd(null, uniquname)
    }

})
const allowedExtentions = [
    ".pdf",
    ".docx",
    ".txt",
    ".csv",
    ".xlsx"
]
const uploadFile = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
    fileFilter(req, file, cb) {
        const extension = path.extname(file.originalname)
        if (!allowedExtentions.includes(extension)) {
            return cb(new Error("unsupported file uploded"))
        }
        cb(null, true)
    }
})

export default uploadFile
