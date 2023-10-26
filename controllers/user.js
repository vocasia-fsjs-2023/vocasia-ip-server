import sequlizeErrors from "../errors/sequlizeErrors";
import { User } from "../models";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, username } = req.body;

  try {
    await User.update(
      {
        email,
        username,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};
