const express = require('express');
const router = express.Router();

// Route 1: Create a User using: POST "/api/auth/". No login required
router.post('/', (req, res) => {
    res.send('User created');
});

module.exports = router;