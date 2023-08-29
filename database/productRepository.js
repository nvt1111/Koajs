// định nghĩa phương thức truy vấn dữ liệu
// const products = require('./products')
// const fs = require('fs');

// import products from './products';
import fs from 'fs';
const testdata = fs.readFileSync('./database/products.json', 'utf-8');
const productData = JSON.parse(testdata);//Object
const products = productData.data;

export function getAll() {
    return products
}

export function getOne(id) {
    return products.find(pro => pro.id === parseInt(id));
}

export function add(data) {
    const dataObject = [...products, { ...data }]
    //data: Object
    fs.writeFileSync('./database/products.json', JSON.stringify({ data: dataObject }));
}

export function updateById(id, data) {
    const productIndex = products.findIndex(pro => pro.id === parseInt(id));
    let product = products[productIndex];
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
    }
    const productUpdate = {
        id: data.id,
        name: data.name,
        price: data.price,
        description: data.description,
        product: data.product,
        createdAt: "2023-06-29T09:36:04.206Z",
        image: "https://loremflickr.com/640/480"
    }
    const pro = [productUpdate, ...products]
    return fs.writeFileSync('./database/products.json', JSON.stringify({ data: pro }))
}

export function deleteById(id) {
    const productIndex = products.findIndex(pro => pro.id === parseInt(id));
    if (productIndex !== -1) {
        products.splice(productIndex, 1); // Xóa 1 phần tử tại vị trí productIndex
    }
    const pro = [...products];
    return fs.writeFileSync('./database/products.json', JSON.stringify({ data: pro }))
}

// module.exports = {
//     getOne,
//     getAll,
//     add,
//     updateById,
//     deleteById
// };