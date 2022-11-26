export const isProductBodyValid = (body) => {
    return !!(body.name && body.price >= 0 && body.category && body.img && body.colors && body.minimumStock >= 0 && body.rating >= 0 && body.reviews >= 0 && body.stars >= 0 && body.stock >= 0 && body.description);
};

export const structureProduct = (body) => {
    return {
        name: body.name,
        price: Number(body.price),
        category: body.category,
        img: body.img,
        colors: [...body.colors],
        minimumStock: body.minimumStock,
        rating: body.rating,
        reviews: body.reviews,
        stars: body.stars,
        stock: body.stock,
        description: body.description
    };
};

export const isMessageBodyValid = (body) => {
    return !!(body.author && body.message);
};

export const structureMessage = (body) => {
    return {
        author: {
            email: body.author.email,
            firstname: body.author.firstname,
            lastname: body.author.lastname,
            age: body.author.age,
            alias: body.author.alias,
            avatar: body.author.avatar
        },
        message: body.message,
        date: new Date().toLocaleString()
    };
};

export const isCartBodyValid = (body) => {
    if (!body.products) return false;
    if (body.products.length === 0) return true;

    body.products.map(productId => {
        if (isNaN(productId)) {
            return false;
        }
    });

    return true;
};

export const structureCart = async (body, productsContainer) => {
    const productsInCart = [];

    try {
        for (const product of body.products) {
            let productFound = await productsContainer.getById(product);

            if (productFound) {
                productsInCart.push(productFound);
            }
        }

    } catch (err) {
        throw new Error(err);
    }

    return {
        timestamp: new Date().toLocaleString(),
        products: productsInCart
    };
};
