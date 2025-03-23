import { Router } from "express"
import { authStatus, loginAdmin, signupAdmin } from "../controllers/userController.js"
import { ensureAuthenticated } from "../utils/authMiddleware.js"


const router = Router()

router.post('/admin/signup', signupAdmin)
router.post('/admin/login', loginAdmin)
router.get('/admin/auth/status', ensureAuthenticated, authStatus)


export default router