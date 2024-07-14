const express = require('express');
const { authenticate } = require('../middlewares/auth');
const UserController = require('../controllers/userController');
const router = express.Router();

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});
router.put('/update-password', authenticate, UserController.updatePassword);

router.put('/update-email', authenticate,UserController.updateEmail);

module.exports = router;
