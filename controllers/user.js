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

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    return res
      .status(200)
      .json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password, username } = req.body;
  try {
    await User.update(
      {
        email,
        password,
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
