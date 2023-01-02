module.exports = class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
    }

    /** Add an item to the cart.
     * @param {Object} item - the item to add to the cart.
     * @param {string} item.title - the title of the item.
     * @param {number} item.price - the price of the item.
     * @param {number} item.quantity - the quantity of the item.
     * @throws {Error} if the item is not an object or if the item has no title, price or quantity.
     * */
    addItem(item) {
        if (typeof item !== 'object') {
            throw new Error('Item must be an object');
        }
        if (!item.title || !item.price || !item.quantity) {
            throw new Error('Item must have a title, price and quantity');
        }
        this.items.push(item);
        this.total += item.price * item.quantity;
    }

    /** get the total price of the cart.
     * @returns {number} the total price of the cart.
     */
    getTotal() {
        return this.total;
    }

    /** get the items in the cart.
     * @returns {Array} an array of items in the cart.
     */
    getItems() {
        return this.items;
    }
};
