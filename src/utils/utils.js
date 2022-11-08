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
    return !!(body.email && body.message);
};

export const structureMessage = (body) => {
    return {
        email: body.email,
        message: body.message,
        date: new Date().toLocaleString()
    };
};

export const isCartBodyValid = () => {

};

export const structureCart = () => {

};
