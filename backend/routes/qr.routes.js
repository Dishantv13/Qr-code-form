import { generateQrCode, createEvent, getEvent, getEventRegistrations } from "../controller/event.controller.js";
import { Router } from "express";

const router = Router();

router.post('/create-event', createEvent);
router.get('/event/:eventId', getEvent);
router.get('/registrations/:eventId', getEventRegistrations);
router.post('/generate-qr', generateQrCode);

export default router;