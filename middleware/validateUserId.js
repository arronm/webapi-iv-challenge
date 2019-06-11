const db = require('../users/userDb');

const validateUserId = async (req, res, next) => {
  try {
    const user = await db.getById(req.params.id);

    if (!user) return res.status(400).json({
      message: 'invalid user id.',
    });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unknown server error',
    });
  }
}

module.exports = validateUserId;
