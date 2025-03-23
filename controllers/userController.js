import { prisma } from "../utils/dbConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signupAdmin = async (req, res) => {
  try {
    const { body } = req;
    const { username, password } = body;
    const saltRounds = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.admin.create({
      data: {
        username,
        password: hashPassword,
      },
    });
    return res.status(201).json({ message: "Admin created", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { body } = req;
    const { username, password } = body;
    const user = await prisma.admin.findUnique({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authStatus = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Invalid Token" });
    }

    const admin = await prisma.admin.findUnique({
        where: {
          id: req.user.id,
        },
      })

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    return res.status(200).json({ id: admin.id, username: admin.username });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
