import jwt from 'jsonwebtoken';
import config from 'config';

const authMiddleware = (req, res, next) => {
  //Get token from header:
  const token = req.header('x-auth-token');

  //check if not token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    //verify token
    const decoded = jwt.verify(token, config.get('JWTSecretKey'));

    //Take payload from decoded and send it with req.
    req.user = decoded.user;
    next();
  } catch (error) {
    //if token is not valid
    res.status(401).json({ message: 'Token is not valid, access denied' });
  }
};

export default authMiddleware;
