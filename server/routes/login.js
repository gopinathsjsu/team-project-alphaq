const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
   
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            // Implement JWT token generation or session management here
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    
});

module.exports = router;
