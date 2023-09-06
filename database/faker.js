import fs from 'fs';
import { faker } from '@faker-js/faker';

function createRandomProduct() {
    return {
        id: faker.datatype.number(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.lorem.sentence(),
        product: faker.commerce.product(),
        color: faker.commerce.color,
        createdAt: faker.date.past().toISOString(),
        image: faker.image.imageUrl(),
    };
}

const PRODUCTS = Array.from({ length: 100 }, createRandomProduct);

const jsonData = JSON.stringify(PRODUCTS, null, 2);

fs.writeFileSync('products.json', jsonData, 'utf8');