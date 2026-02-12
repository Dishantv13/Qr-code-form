import { Register } from "../model/register.model.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, phonenumber, eventId, age, address } = req.body;
        // const newUser = new Register({ 
        //     name, 
        //     email, 
        //     phonenumber, 
        //     eventId, 
        //     age, 
        //     address 
        // });

        // await newUser.save();

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
        res.status(500).json({ message: error.message });
    }  
}

export { registerUser }             