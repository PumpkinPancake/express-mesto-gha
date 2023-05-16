const router = require('express').Router();

const cardsRouter = require('./cards');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res) => {
  // eslint-disable-next-line no-undef
  res.status(404).send({ message: 'This address does not exist' });
});

module.exports = router;
