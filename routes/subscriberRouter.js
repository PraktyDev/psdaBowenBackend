import { Router } from "express"
import { allSubscribers, deleteSubscribers, emailSubscribers } from "../controllers/subscriberController.js"


const router = Router()

router.post('/subscriber', emailSubscribers)
router.get('/subscribers', allSubscribers)
router.delete('/subscriber/:id', deleteSubscribers)



export default router