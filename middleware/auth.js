const jwt = require("jsonwebtoken");
const config = process.env;

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWTSECRET);
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        // throw 'Invalid user ID';
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };