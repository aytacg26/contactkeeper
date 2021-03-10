import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

/**
 * @route           POST api/users
 * @description     Register a user
 * @access          Public
 */
export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //A New User will be created
    user = new User({
      name,
      email,
      password,
    });

    //Encrypt User Password:
    const salt = await bcrypt.genSalt(12);

    //Hash the user password
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //For JWT, as payload, we will just send the user id
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
    }); //Jwt will expire in 5 hours, in production, we have to make it 3600 seconds (1 hour)

    // res.json({ message: 'User Registered Successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

const UserController = Object.freeze({
  registerUser,
});

export default UserController;
