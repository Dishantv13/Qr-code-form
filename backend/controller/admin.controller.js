import { Admin } from "../model/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminRegister = async (req, res) => { 
    try {
        const { name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).json ({ message : "Name, email, and password are required" });
        }

        const existingAdmin = await Admin.findOne({ email });

        if(existingAdmin) {
            return res.status(409).json ({ message : "Admin with this email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newAdmin = await Admin.create({
            name,
            email,
            password : hashedPassword,
            role : "admin"
        })

        return res.status(201).json({ message : "Admin registered Successfully ", admin : {
            id : newAdmin._id,
            name : newAdmin.name,
            email : newAdmin.email,
            role : newAdmin.role
        }
    })    
    } catch (error) {
        return res.status(500).json ({ message : error.message})
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({message : "Email and password are required"})
        }

        const admin = await Admin.findOne({ email, role :"admin"});

        if(!admin ){
            return res.status(401).json({message : "Admin not Found"})
        }

        const isPassword = await bcrypt.compare(password, admin.password);

        if(!isPassword) {
            return res.status(401).json({message : "Invalid password"})
        }

        const token = jwt.sign({
            id : admin._id,
            role : admin.role
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1d" });

        return res.status(200).json({ 
            message: "Admin logged in successfully", 
            token,
            admin :{
                id : admin._id,
                name : admin.name,
                email : admin.email,
                role : admin.role
            }
        });

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}

const adminLogout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(' ')[1];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.status(200).json({ message: "Admin logged out successfully" });
        
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token already expired" });
        }
        return res.status(500).json({ message: error.message });
    }
}


export { adminRegister, adminLogin, adminLogout }