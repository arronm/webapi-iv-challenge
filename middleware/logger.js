const logger = (req, res, next) => {
  try {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url}`
    );
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unknown server error trying to log request',
    });
  }
}

module.exports = logger;
