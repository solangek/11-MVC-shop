
/** A MODULE to manage the Product model.
 * in future examples, we will use a database to store data.
*/

module.exports = class Product {
  constructor(t, p, id) {
    this.title = t;
    this.price = p;
    this.id = id;
  }

  /** Save the product to a file.
   * @throws {Error} if the product already exists or if the product has no title.
   * */

  save() {
    if (!this.title || !this.price || !this.id) {
      throw new Error('Product must have a title, price and id');
    }
    if (productList.includes(this.title)) {
        throw new Error('Product already exists');
    }
    productList.push(this);
  }

  /** Fetch all products from the file.
   * @returns {Array} an array of products.
   */
  static fetchAll() {
    return (productList);
  }

  static getLength() {
    return productList.length;
  }
};

/*
 this example stores the model in memory. Ideally these should be stored
 persistently in a database.
 */
let productList = [];

