const express = require('express');

// load the controllers
const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.showProductForm);

// /admin/add-product => POST
router.post('/add-product', productsController.addProduct);

// /admin/manage => GET
router.get('/manage', productsController.manageProducts);

router.post('/delete-product', productsController.deleteProduct);

module.exports = router;
