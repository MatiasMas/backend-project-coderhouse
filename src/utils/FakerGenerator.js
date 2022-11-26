import {faker} from "@faker-js/faker";

faker.locale = "en_US";

export const generateProduct = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        img: faker.image.imageUrl(480, 480, "product", true),
        price: Number(faker.commerce.price(100, 7000)),
        stock: Number(faker.random.numeric(2)),
        minimumStock: Number(faker.random.numeric(1)),
        category: faker.commerce.department(),
        colors: [faker.color.human(), faker.color.human(), faker.color.human()],
        rating: Number(faker.datatype.float({ min: 1, max: 5, precision: 0.1 })),
        reviews: Number(faker.random.numeric(3)),
        stars: Math.floor(Number(faker.commerce.price(1, 5))),
    };
};
