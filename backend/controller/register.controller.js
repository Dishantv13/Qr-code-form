import { Register } from "../model/register.model.js";


const registerUser = async (req, res) => {
    try {
        const { name, email, phonenumber, eventId, age, address } = req.body;

        if(!name || !email || !phonenumber || !eventId || !age || !address){
            return res.status (400).json ({ message : "All fields are required"});
        }

        const newUser = await Register.create({
            name,
            email,
            phonenumber,
            eventId,
            age,
            address
        })
        res.status(201).json({  message: "User registered successfully", user: newUser });

    } catch (error) {
        // Handle duplicate registration for the same event
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: "You have already registered for this event" 
            });
        }
        res.status(500).json({ message: error.message });
    }  
}

export { registerUser }             