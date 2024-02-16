const Product = require('../models/product');

// the controllers folder allows us to separate the logic from the routes.
// this is a good practice because it allows us to reuse the logic in multiple routes.
// note that this controller returns HTML only! it sometimes also redirects to other routes.
// if it was a REST API, it would return JSON.
// pay attention NOT TO MIX HTML and JSON in the same controller.

/**
 * displays the add product page that includes a form.
 * @param req
 * @param res
 * @param next
 */
exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

/**
 * handles the post request from the add product page.
 * redirects to the home page to show all products.
 * @param req
 * @param res
 * @param next
 */
exports.postAddProduct = (req, res, next) => {
  let newId = generateId();
  try {
    const product = new Product(req.body.title, req.body.price, newId);
    product.save();
    // what is the difference between (1) and (2)?
    //res.redirect('/'); // (1)
    let prods = Product.fetchAll();   // (2)
    res.render('shop', {
      prods: prods,
      pageTitle: 'My Shop',
      path: '/',
      hasProducts: prods.length > 0
    });
  } catch (err) {
    // TO DO! we must handle the error here and generate a EJS page to display the error.
  }

};

/**
 * displays the home page that includes a list of all products.
 * @param req
 * @param res
 * @param next
 */
exports.getProducts = (req, res, next) => {
  let prods = Product.fetchAll();
  res.render('shop', {
    prods: prods,
    pageTitle: 'My Shop',
    path: '/',
    hasProducts: prods.length > 0
  });

};

const generateId = () => {
  // get the length of the array and add 1 to it.
    return Product.getLength() + 1;
}
