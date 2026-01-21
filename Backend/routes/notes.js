const express = require('express');
const router = express.Router();

// Route 1: Create a User using: POST "/api/auth/". No login required
router.get('/', (req, res) => {
    res.send('User created');
});

module.exports = router;