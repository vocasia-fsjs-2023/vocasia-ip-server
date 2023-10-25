import bcrypt from "bcrypt";
import sequlizeErrors from "../errors/sequlizeErrors";
import jwt from "jsonwebtoken";

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
