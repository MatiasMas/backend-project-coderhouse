export class ProductsBaseDAO {
    maxId;
    products;

    constructor() {
        this.maxId = 0;
        this.products = [];
    }

    save(product) {
        throw new Error("Feature not implemented.");
    }

    getById(id) {
        throw new Error("Feature not implemented.");
    }

    deleteById(id) {
        throw new Error("Feature not implemented.");
    }

    deleteAll() {
        throw new Error("Feature not implemented.");
    }

    updateProductById(id, product) {
        throw new Error("Feature not implemented.");
    }
}