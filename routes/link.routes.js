const { Router } = require('express');
const config = require('config');
const shorId = require('shortid');
const Link = require('../models/Link');
const router = Router();
const authMiddleware = require('../middleware/auth.middleware');

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from } = req.body;

    const code = shorId.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + '/t/' + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId
    });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' });
  }
});
router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res
      .status(500)
      .json({
        message: `Something went wrong, try again BROOOO, ${e.message}`
      });
  }
});

module.exports = router;
