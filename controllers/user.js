import sequlizeErrors from "../errors/sequlizeErrors";
import { User } from "../models";

export const createUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = await User.create({
      email,
      password,
      username,
    });

    return res
      .status(201)
      .json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};
