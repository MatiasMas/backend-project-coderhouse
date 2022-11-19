export class CartsBaseDAO {
    maxId;
    carts;

    constructor() {
        this.maxId = 0;
        this.carts = [];
    }

    deleteAll() {
        throw new Error("Feature not implemented.");
    }

    deleteById(id) {
        throw new Error("Feature not implemented.");
    }

    getAll() {
        throw new Error("Feature not implemented.");
    }

    save(cart) {
        throw new Error("Feature not implemented.");
    }

    saveNewProductInCart(idCart, product) {
        throw new Error("Feature not implemented.");
    }

    deleteProductInCart(idCart, idProduct) {
        throw new Error("Feature not implemented.");
    }

    getById(id) {
        throw new Error("Feature not implemented.");
    }

    isProductInCart(cart, idProduct) {
        throw new Error("Feature not implemented.");
    }
}