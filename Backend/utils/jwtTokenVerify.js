import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) throw err;
    else return user;
  });
};

export default verifyToken;
