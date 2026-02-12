import { Event } from "../model/event.model.js";
import { Register } from "../model/register.model.js";
import Qrcode from "qrcode";

const createEvent = async (req, res) => {
  try {
    const { eventId, eventName, date, description, location, capacity} = req.body;

    if(!eventId || !eventName || !date || !location) {
      return res.status(400).json({message: "Event ID, Event Name, Date and Location are required"});
    }

    const existingEvent = await Event.findOne({ eventId });
    if(existingEvent) {
      return  res.status(400).json({message : "Event ID already exists"});
    }

    const newEvent = await Event.create({
      eventId,
      eventName,
      date,
      description,
      location,
      capacity
    })

    res.status(201)
    .json({ message : "Event Create Successfully", event:newEvent});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getEvent =async(req, res) => {
  try {
    const {eventId} = req.params;

    const event = await Event.findOne({ eventId });

    if(!event) {
      return res.status(404).json({ message : "Event not found"})
    }

    res.status(200).json({ message : "Event Found", event})
    
  } catch (error) { 
    return res.status(500).json({ message : error.message})
  }
}

const getEventRegistrations  = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findOne({eventId});

    if(!event) {
      return res.status(404).json({ message : "Event Not Found"})
    }

    const registrations = (await Register.find({eventId})).sort({createdAt : -1});

    res.status(200).json({
      event :{
        eventId : event.eventId,
        eventName : event.eventName,
        date : event.date,
        location : event.location,
        capacity : event.capacity
      },
      totalRegistrations : registrations.length,
      registrations,
      messsage : "Registration Fetched Successfully "
    })
    
  } catch (error) {
    return res.status(500).json({ message : error.message })
  }
}

const generateQrCode = async (req,res) => {
  try {
    const { eventId }  = req.body;

    if(!eventId) {
      return res.status(400).json({ message: "Event Id Is Required"})
    }

    const event = await Event.findOne({ eventId });

    if(!event) {
      return res.status(400).json({ message : "Event Not Found"})
    }

    const url = `http://localhost:5173/register/${eventId}`;

    const qrCodeDataURL = await Qrcode.toDataURL(url);

    res.status(200).json({ qrCode : qrCodeDataURL, message : "QR Code Generated Successfully" })

  } catch (error) {
    return res.status(500).json({ message : error.message })
  }
}

export { createEvent, getEvent, getEventRegistrations, generateQrCode };
