import { Router } from "express"
import { deleteEvent, editEvent, getAllEvents, getSingleEvent, postEvent } from "../controllers/eventController.js"
import { upload } from "../utils/uploadImg.js"


const router = Router()

router.post('/event', upload.single("image"), postEvent)
router.get('/events', getAllEvents)
router.get('/events/:id', getSingleEvent)
router.put('/events/:id', editEvent)
router.delete('/events/:id', deleteEvent)



export default router