import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'invalid credentials' });
    }

    //check password with bcrypt.compare()
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'invalid credentials' });
    }

    //Send token to user:
    const payload = {
      user: {
        id: user.id,
      },
    };

    const jwtKey = config.get('JWTSecretKey');
    const expire = config.get('tokenExpire');

    jwt.sign(payload, jwtKey, { expiresIn: expire }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

const getAuthUser = async (req, res) => {
  try {
    const authUserId = req.user.id;

    //We will find user by id and with projection we will prevent password to fetched from database
    const authUser = await User.findById(authUserId, { password: 0 });

    //we will send authUser data, without password
    res.json(authUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
};

const authController = Object.freeze({
  login,
  getAuthUser,
});

export default authController;
