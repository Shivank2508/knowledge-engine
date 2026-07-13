import { Router } from "express";
import uploadFile from "../middleware/upload.middleware";
import { uploadDocument } from "../controller/document.controller";

const router = Router()

router.post("/upload",
    uploadFile.single("document"),
    uploadDocument
)

export default router