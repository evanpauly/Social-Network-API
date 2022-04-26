const router = require('express').Router();

const userRoutes = require('./user-routes');
const reactionRoutes = require('./reaction-routes')
const thoughtRoutes = requires('./thought-routes');

router.use('/users', userRoutes);
router.use('/reactions', reactionRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;