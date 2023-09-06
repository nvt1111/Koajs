import fs from 'fs';
import sortProduct from '../helpers/sortData.js';
import pickFields from '../helpers/fieldData.js';
import { writeFileSync, readFileSync } from '../helpers/writeAndReadFileSync.js';


const products = readFileSync();

export function getProducts({ limit, sort = "asc" }) {
    let result = [...products];

    if (sort) {
        result = sortProduct(sort, result);
    }
    if (limit) {
        result = result.slice(0, parseInt(limit))
    }

    return result;
}

export function getOne({ id, fields = null }) {
    const product = products.find(pro => pro.id === id);
    if (fields) {
        const fieldsArray = fields.split(',');

        return pickFields(product, fieldsArray)
    }

    return product;
}

export function add(data) {
    const timestamp = new Date().getTime(); // Lấy timestamp

    const randomValue = Math.floor(Math.random() * 1000); // Số ngẫu nhiên

    const idProduct = `${timestamp}${randomValue}`;

    const createdAt = new Date();

    const product = { id: idProduct, createdAt, ...data };

    const dataObject = [...products, { ...product }]
    //data: Object
    writeFileSync(dataObject);
}

export function updateById(id, data) {
    const productList = products.map(pro => {
        if (pro.id === id) {
            return {
                ...pro,
                ...data,
                updateAt: new Date()
            }
        }
        return pro;
    })
    writeFileSync(productList);
}

export function deleteById(id) {
    const productList = products.filter(product => product.id !== (id));

    writeFileSync(productList);
}


