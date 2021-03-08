import User from '../models/User.js';
import bcrypt from 'bcryptjs';

/**
 * @route           POST api/users
 * @description     Register a user
 * @access          Public
 */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

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

    res.json({ message: 'User Registered Successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

const UserController = Object.freeze({
  registerUser,
});

export default UserController;
