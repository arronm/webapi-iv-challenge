const express = require('express');
const userDB = require('./userDb');
const postDB = require('../posts/postDb');
const validateUser = require('../middleware/validateUser');
const validatePost = require('../middleware/validatePost');
const validateUserId = require('../middleware/validateUserId');

const router = express.Router();
router.use(express.json());

router.post('/', validateUser, async (req, res) => {
  try {
    const user = await userDB.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unknown server error creating new user',
    });
  }
});

router.post('/:id/posts', validatePost, async (req, res) => {
  try {
    const post = await postDB.insert({
      ...req.body,
      user_id: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unknown server error creating new posts for user by id',
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await userDB.get();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unknown server error getting users',
    });
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unknown server error getting user by id',
    });
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const posts = await userDB.getUserPosts(req.user.id);
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unknown server error getting user posts by user id',
    });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    await userDB.remove(req.user.id);
    res.json(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unknown server error removing user by id.',
    });
  }
});

router.put('/:id', validateUserId, async (req, res) => {
  try {
    await userDB.update(req.user.id, req.body);
    res.json({
      ...req.user,
      ...req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Unknown server error updating user',
    });
  }
});

module.exports = router;
