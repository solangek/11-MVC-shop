const express = require('express');

// load the controllers
const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

// /admin/manage => GET
router.get('/manage', productsController.getManage);

// /admin/delete-product/:productId => POST
router.post('/delete-product/:productId', productsController.deleteProduct);

module.exports = router;
