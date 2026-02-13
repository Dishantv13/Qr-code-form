import { adminLogin,
    adminRegister, 
    adminLogout 
} from "../controller/admin.controller.js";
import { Router } from "express";

const router = Router();

router.route('/register').post(adminRegister)
router.route("/login").post(adminLogin)
router.route("/logout").post(adminLogout)

export default router;