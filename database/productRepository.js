import fs from 'fs';
import sortProduct from '../helpers/sortData.js';

const testdata = fs.readFileSync('./database/products.json', 'utf-8');
const productData = JSON.parse(testdata);//Object
const products = productData.data;

// sao lại phải { sort = "asc", limit } = {} như này nhỉ ? 
export function getProducts({ sort = "asc", limit } = {}) {

    let product = [...products];

    if (sort) {
        product = sortProduct(sort, product);
    }
    if (limit) {
        product = product.slice(0, parseInt(limit))
    }

    return product;
}

export function getOne(id) {
    //todo: viết 1 hàm pick những fields cần thiết cho anh nhé . 
    return products.find(pro => pro.id == (id));
}

export function add(data) {

    const dataObject = [...products, { ...data }]
    //data: Object
    fs.writeFileSync('./database/products.json', JSON.stringify({ data: dataObject }));
}

export function updateById(id, data) {

    const productIndex = products.findIndex(pro => pro.id == (id));

    // todo: chỗ này em thay vì em phải đẩy full data thì em chỉ đẩy những fiedls cần update còn các fields khác giữ nguyên nhé .
    const productNew = { id: id, createdAt: new Date().toISOString(), ...data };

    products[productIndex] = productNew;
    //todo: đoạn này dùng đi dùng lại nhiều lần , viết ra 1 hàm rieeng nhé . 

    fs.writeFileSync('./database/products.json', JSON.stringify({ data: products }))
}

export function deleteById(id) {

    //todo: dùng !== nhé . hạn chế hoặc không dùng !=
    const productList = products.filter(product => product.id != (id));

    fs.writeFileSync('./database/products.json', JSON.stringify({ data: productList }))
}

//todo: cái gì không dùng nữa thì xóa đi nhé 

// export const sortProduct = (value, data) => {
//     data.sort((a, b) => (value === 'desc') ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt));
//     return data;
// }

// export const sortAndLimitProduct = (limit, value) => {
//     const allProducts = [...products];
//     const productList = allProducts.slice(0, limit).map(item => item);
//     const sortedProduct = sortProduct(value, productList);
//     return sortedProduct;
// }

// export const productLimit = (limit) => {
//     const allProducts = [...products];
//     const productList = allProducts.slice(0, limit).map(item => item);
//     return productList;
// }
