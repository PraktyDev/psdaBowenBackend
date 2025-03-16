import { Router } from "express"
import { deleteNews, editNews, getAllNews, getSingleNews, postNews } from "../controllers/newsController.js"
import { upload } from "../utils/uploadImg.js"


const router = Router()

router.post('/news', upload.single("image"), postNews)
router.get('/news', getAllNews)
router.get('/news/:id', getSingleNews)
router.put('/news/:id', upload.single("image"), editNews)
router.delete('/news/:id', deleteNews)



export default router