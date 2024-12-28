const jwt = require('jsonwebtoken');

const requireLogin = (req, res, next) => {
    console.log(req.cookies);
  const token = req.cookies['auth-token'];
    
  // Check if token is present
  if (!token) {
    return res.status(401).json({ success: false, msg: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedUser; // Attach user data to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(`Error verifying token: ${err}`);
    res.status(403).json({ success: false, msg: 'Invalid or expired token.' });
  }
};

module.exports = requireLogin;
