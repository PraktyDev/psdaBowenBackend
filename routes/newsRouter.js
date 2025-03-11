import { Router } from "express"
import { deleteNews, editNews, getAllNews, getSingleNews, postNews } from "../controllers/newsController.js"


const router = Router()

router.post('/news', postNews)
router.get('/news', getAllNews)
router.get('/news/:id', getSingleNews)
router.put('/news/:id', editNews)
router.delete('/news/:id', deleteNews)



export default router