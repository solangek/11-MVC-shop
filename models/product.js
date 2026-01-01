// models/product.js

/** In-memory product list */
let productList = [];

/** A MODULE to manage the Product model. */
module.exports = class Product {
  /**
   * @param {string} t - Product title
   * @param {number} p - Product price
   * @param {string|number} id - Product ID
   */
  constructor(t, p, id) {
    this.title = t;
    this.price = p;
    this.id = id;
  }

  /**
   * Save the product to the in-memory list.
   * @throws {Error} if the product already exists or has missing fields.
   */
  save() {
    if (!this.title || !this.price || !this.id) {
      throw new Error('Product must have a title, price and id');
    }
    if (productList.some(prod => prod.id === this.id || prod.title === this.title)) {
      throw new Error(`Product with ID ${this.id} or title "${this.title}" already exists`);
    }
    productList.push(this);
  }

  /**
   * Fetch all products.
   * @returns {Array<Product>}
   */
  static fetchAll() {
    return [...productList];
  }

  /**
   * Get the number of products.
   * @returns {number}
   */
  static getLength() {
    return productList.length;
  }

  /**
   * Delete a product by ID.
   * @param {string|number} id
   * @returns {boolean}
   */
  static deleteById(id) {
    const index = productList.findIndex(prod => prod.id === id);
    if (index !== -1) {
      productList.splice(index, 1);
      return true;
    }
    return false;
  }
};
