import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const tokenExpiry = process.env.JWT_TOKEN_EXPIRY;

const generateToken = (phoneNumber) => {
  return jwt.sign({ phoneNumber }, jwtSecretKey, { expiresIn: tokenExpiry });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecretKey);
};

const authServices = {
  generateToken,
  verifyToken,
};

export default authServices;
