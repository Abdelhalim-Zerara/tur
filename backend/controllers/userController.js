const User = require('../models/User'); // assuming you have a User model defined
const bcrypt = require('bcrypt');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();



let registerUser = expressAsyncHandler( async function (req, res) {
      const { fullName, email, password } = req.body;
  
      if (!email || !password || !fullName) {
        return res.status(400).json({ message: 'All fields are required are required' });
      }
  
      const existingUser = await User.findOne({ email } );
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
     // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

      if (user)
        res.status(201).json({ message: 'User created successfully' });
      else 
        res.status(500).json({ message: 'Internal server error' });
    
  })

  let loginUser =expressAsyncHandler(async function (req, res) {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  
    const token = generateToken(user._id);
  
    return res.status(200).json({
        message: 'Login successful',
        token,
        email: user.email,
        fullName: user.fullName,
        id : user._id
      });
  })
  

  
function generateToken(userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
  }


  let deleteUser = expressAsyncHandler(async function (req, res) {
  
    try {
      const user = await User.findByIdAndDelete(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  let updateUser = expressAsyncHandler(async function (req, res) {
    const userId = req.user._id.toString();
    const { fullName, email, password } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password || user.password, salt);

      await User.findOneAndUpdate(
        { _id: userId },
        { email: email || user.email, password: newPassword, fullName: fullName || user.fullName }
      ); 

      
      return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  let getUser = expressAsyncHandler(async function (req, res) {
  
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: user.fullName });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  let getMe = expressAsyncHandler(async function (req, res) {
  
    const userId = req.user._id.toString();

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
    
      return res.status(200).json({
        email: user.email,
        fullName: user.fullName,
        id : user._id
      });

    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  });


  module.exports = { registerUser, loginUser, deleteUser , updateUser, getUser,getMe };
  
  