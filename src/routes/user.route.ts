import express from "express"
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post('/auth/register', userController.register)
router.post('/auth/login', userController.login)
router.post('/auth/refresh', userController.refresh)

router.get('/users/me', userController.getMe)
router.patch('/users/me', userController.updateMe)

router.post('/auth/logout', userController.logout)
router.post('/auth/forget-password', userController.forgetPassword)
router.post('/auth/reset-password', userController.resetPassword)

export default router;