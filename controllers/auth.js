import bcrypt from "bcrypt";
import sequlizeErrors from "../errors/sequlizeErrors";
import jwt from "jsonwebtoken";
import { User } from "../models";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (result) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).json({ token });
      }

      return res.status(401).json({ message: "Unauthorized" });
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      username,
    });

    return res.status(201).json({
      message: "User created",
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};
