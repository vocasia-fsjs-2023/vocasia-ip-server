import { User } from "../models";

export const createUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      username,
    });

    res.status(201).json(user);
  } catch (error) {}
};
