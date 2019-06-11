const db = require('../posts/postDb');

const validatePostId = async (req, res, next) => {
  try {
    const post = await db.getById(req.params.id);

    if (!post) return res.status(400).json({
      message: 'invalid post id.',
    });

    req.post = post;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unknown server error',
    });
  }
}

module.exports = validatePostId;
