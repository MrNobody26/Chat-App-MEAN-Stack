import { verifyToken } from "../utils/index.js";

const authenticate = async (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const user = verifyToken(token);
      req.user = user;
      next();
    } catch (err) {
      res.status(403).json({ message: "Unauthorized Token" });
    }
  } else {
    res.status(401).json({ message: "Token not provided" });
  }
};

export default authenticate;
