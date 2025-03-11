import { Router } from 'express'
import userRouter from "./userRouter.js"
import eventRouter from "./eventRouter.js"
import newsRouter from "./newsRouter.js"
import subscriberRouter from "./subscriberRouter.js"


const router = Router()


router.use(userRouter)
router.use(eventRouter)
router.use(newsRouter)
router.use(subscriberRouter)


export default router