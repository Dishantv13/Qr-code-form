import { registerUser } from "../controller/register.controller.js";
import { Router } from "express";

const router = Router();

router.post('/', registerUser)

export default router;