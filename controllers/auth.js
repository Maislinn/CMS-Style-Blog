// JSON Web Tokens https://jwt.io/introduction

const { hashPassword, verifyPassword } = require('../middleware/auth.js');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      username: user.username
    };

    res.json({ user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log(req.body)

    //Check if email is already registered
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      name
    });

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name
    };
    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });

    // Set headers to allow authorization

    res.setHeader('Authorization', `Bearer ${token}`);

    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name
    };
   
  res.redirect('/dashboard');
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) throw err;
      res.clearCookie(process.env.SESSION_NAME);
      res.status(200).end();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, register, logout };