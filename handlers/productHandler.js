// const { getOne, getAll, add, updateById, deleteById } = require('../database/productRepository');
// const products = require('../database/products');

import { getOne, getAll, add, updateById, deleteById } from '../database/productRepository.js';
import fs from 'fs';
// import products from '../database/products';
const testdata = fs.readFileSync('./database/products.json', 'utf-8');
const productData = JSON.parse(testdata);//Object
const products = productData.data;

const listProduct = async (ctx) => {
    try {
        console.log('kkkkkkkkkkk', products.length);
        const limit = parseInt(ctx.query.limit) || products.length;

        const allProducts = [...products];
        const product = allProducts.slice(0, limit).map(item => item);
        ctx.body = {
            data: product
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

const sortProduct = (ctx, next) => {
    try {
        const sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
            if (ctx.query.sort === 'desc') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else {
                return new Date(a.createdAt) - new Date(b.createdAt); // Thêm 'return' ở đây
            }
        })
        ctx.body = {
            data: sortedProducts
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

const sortAndLimitProduct = (ctx, next) => {
    try {
        const limit = parseInt(ctx.query.limit) || products.length;
        const allProducts = [...products];
        const product = allProducts.slice(0, limit);
        product.sort((a, b) => {
            if (ctx.query.sort === 'desc') {
                return (b.createdAt) - (a.createdAt);
            } else {
                return (a.createdAt) - (b.createdAt); // Thêm 'return' ở đây
            }
        })
        ctx.body = {
            data: product
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}
const handelGetProduct = (ctx, next) => {
    const limit = parseInt(ctx.query.limit);
    const sort = ctx.query.sort;

    if (limit !== undefined) {
        listProduct(ctx);
    } else if (sort !== undefined) {
        sortProduct(ctx);
    } else if (limit !== undefined && sort !== undefined) {
        sortAndLimitProduct(ctx);

    }
}
const deleteProduct = (ctx) => {
    try {
        const id = ctx.params.id;
        deleteById(id); // Gọi hàm deleteById đồng bộ
        ctx.body = {
            success: true,
            message: `Product with ID ${id} has been deleted`
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

const creatProduct = async (ctx) => {
    try {
        const pro = {
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            price: ctx.request.body.price,
            description: ctx.request.body.description,
            product: ctx.request.body.product,
            createdAt: "2023-06-29T09:36:04.206Z",
            image: "https://loremflickr.com/640/480"
        }
        const existingProduct = products.find(product => product.id === pro.id);
        if (existingProduct) {
            ctx.status = 400;
            ctx.body = {
                success: false,
                message: `Product with ID ${pro.id} already exists`
            };
            return;
        } else {
            // const pro = ctx.request.body;
            // const dataJSON = JSON.stringify(pro);
            add(pro);

            ctx.body = {
                success: true,
                message: `Product with ID ${pro.id} has been created`,
                pro
            };
        }

    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }


}

const getProByID = (ctx) => {
    try {
        const pro = getOne(ctx.params.id);
        const fieldUrl = ctx.query.field;
        if (fieldUrl) {
            const field = fieldUrl.split(',');

            const showProduct = {};
            field.forEach(f => {
                if (pro[f] !== undefined) {
                    showProduct[f] = pro[f];
                }
            })
            ctx.body = {
                data: showProduct
            };
        } else {
            ctx.body = {
                data: pro
            };
        }

    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }

}

const updateProduct = (ctx) => {
    try {
        const id = ctx.params.id;
        const data = ctx.request.body;
        updateById(id, data);
        ctx.body = {
            success: true,
            message: `Product with ID ${data.id} has been UPDATE`,
            data
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

export default {
    handelGetProduct,
    deleteProduct,
    creatProduct,
    getProByID,
    updateProduct
}


// module.exports = {
//     handelGetProduct,
//     deleteProduct,
//     creatProduct,
//     getProByID,
//     updateProduct
// }