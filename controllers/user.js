import sequlizeErrors from "../errors/sequlizeErrors";
import { User } from "../models";

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
