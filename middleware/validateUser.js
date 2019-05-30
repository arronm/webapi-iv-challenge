const validateUser = (req, res, next) => {
  try {
    if (Object.keys(req.body).length == 0) return res.status(400).json({
      message: 'missing user data'
    });

    if (!req.body.name) return res.status(400).json({
      message: 'missing required name field'
    });
    
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unknown server error validating user',
    });
  }
}

module.exports = validateUser;
