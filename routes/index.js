

const router = require('express').Router();
const customers = require('./customers');
const login = require('./login');

router.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
router.use('/login', login);
router.use('/customers', customers);

module.exports = router;