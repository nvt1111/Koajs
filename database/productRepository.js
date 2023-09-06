import fs from 'fs';
import sortProduct from '../helpers/sortData.js';
import fieldData from '../helpers/fieldData.js';
import { writeFileSync, readFileSync } from '../helpers/writeAndReadFileSync.js';


const products = readFileSync();

export function getProducts({ sort = "asc", limit }) {

    let product = [...products];

    if (sort) {
        product = sortProduct(sort, product);
    }
    if (limit) {
        product = product.slice(0, parseInt(limit))
    }

    return product;
}

export function getOne(id, fields) {
    const product = products.find(pro => pro.id === (id));

    if (fields) {
        return fieldData(product, fields)
    } else {
        return product;
    }
}

export function add(data) {

    const dataObject = [...products, { ...data }]
    //data: Object
    writeFileSync(dataObject);
}

export function updateById(id, data) {
    const productList = products.map(pro => {
        if (pro.id === id) {
            return {
                ...pro,
                ...data,
                updateAt: new Date().toISOString()
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


