const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/adminAuth')

router.route('/category')
.get(categoryCtrl.getCategory)
.post(auth,authAdmin,categoryCtrl.createCategory)


module.exports = router;