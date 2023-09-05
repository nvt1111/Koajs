import fs from 'fs';

const testdata = fs.readFileSync('./database/products.json', 'utf-8');
const productData = JSON.parse(testdata);//Object
const products = productData.data;

export function getAll() {
    return products;
}

export function getOne(id) {
    return products.find(pro => pro.id == (id));
}

export function add(data) {
    const dataObject = [...products, { ...data }]
    //data: Object
    fs.writeFileSync('./database/products.json', JSON.stringify({ data: dataObject }));
}

export function updateById(id, data) {
    const productIndex = products.findIndex(pro => pro.id == (id));
    const productNew = { id: id, createdAt: new Date().toISOString(), ...data };
    products[productIndex] = productNew;
    fs.writeFileSync('./database/products.json', JSON.stringify({ data: products }))
}

export function deleteById(id) {
    const productList = products.filter(product => product.id != (id));
    fs.writeFileSync('./database/products.json', JSON.stringify({ data: productList }))
}

