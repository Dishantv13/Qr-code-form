import { generateQrCode, createEvent, getEvent, getEventRegistrations, getAllEvents } from "../controller/event.controller.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { Router } from "express";

const router = Router();

router.route('/create-event').post(isAdmin, createEvent);
router.route('/events').get(getAllEvents);
router.route('/event/:eventId').get(getEvent);
router.route('/registrations/:eventId').get(isAdmin, getEventRegistrations);
router.route('/generate-qr').post(generateQrCode);

export default router;