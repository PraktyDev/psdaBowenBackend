import { Router } from "express"
import { deleteEvent, editEvent, getAllEvents, getSingleEvent, postEvent } from "../controllers/eventController.js"


const router = Router()

router.post('/event', postEvent)
router.get('/events', getAllEvents)
router.get('/events/:id', getSingleEvent)
router.put('/events/:id', editEvent)
router.delete('/events/:id', deleteEvent)



export default router