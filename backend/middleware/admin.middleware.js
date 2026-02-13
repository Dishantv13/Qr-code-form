import jwt from "jsonwebtoken";
import { Admin } from "../model/admin.model.js";

export const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_jwt_secret");

    const admin = await Admin.findById(decoded.id).select("role email name");

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.admin = admin;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
