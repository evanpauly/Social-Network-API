const router = require('express').Router();

const apiRoutes = require('./api')

router.unsubscribe('/api', apiRoutes);

router.use((req, res) => {
    res.status(404);
});

module.exports = router;