const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware')
const {registerUser, loginUser, deleteUser, updateUser,getUser,getMe} = require('../controllers/userController')




router.post('/register', registerUser);

router.put('/me', authMiddleware, updateUser);

router.get('/me', authMiddleware, getMe);


router.post('/login', loginUser);


router.delete('/me',authMiddleware, deleteUser);

router.get('/check/:id', getUser);

module.exports = router;
