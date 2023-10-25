import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  if (!bearerToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
};
