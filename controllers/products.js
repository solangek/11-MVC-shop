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
exports.showProductForm = (req, res, next) => {
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
exports.addProduct = (req, res, next) => {
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
    res.status(500).render('error', { message: err.message || 'An error occurred.',
    pageTitle: 'Error', path: '/' });
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

/**
 * displays the manage page with all products
 */
exports.manageProducts = (req, res, next) => {
  let prods = Product.fetchAll();
  console.log("Managing products:", prods);
  res.render('manage', {
    prods: prods,
    pageTitle: 'Manage Books',
    path: '/admin/manage'
  });
};

const generateId = () => {
  // get the length of the array and add 1 to it.
    return Product.getLength() + 1;
}

// delete a product by id
exports.deleteProduct = (req, res, next) => {
    // normalize id to a number and validate
    const rawId = req.body.pid;
    if (!rawId) {
        console.log('No pid in request body:', req.body);
        return res.redirect('/');
    }

    const productId = parseInt(rawId, 10);

    const deleted = Product.deleteById(productId);
    if (deleted) {
        console.log(`Product with ID ${productId} deleted successfully.`);
    } else {
        console.log(`Product with ID ${productId} not found. deleteById returned:`, deleted);
    }

    const after = Product.fetchAll();
    console.log('After delete:', after);

    res.redirect('/');
};

// update a product by id
exports.updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  // TO DO! implement the update logic here.
  // for now, we will just redirect to the home page.
  res.redirect('/');
};
