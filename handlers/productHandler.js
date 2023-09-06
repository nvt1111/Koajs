import {
    getOne, getProducts, add,
    updateById, deleteById,
} from '../database/productRepository.js';
import fs from 'fs';

const testdata = fs.readFileSync('./database/products.json', 'utf-8');
const productData = JSON.parse(testdata);//Object
const products = productData.data;

const handelGetProduct = (ctx) => {
    try {
        const { sort, limit } = ctx.query;

        const data = getProducts({ sort, limit })

        ctx.body = {
            data: data
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


const deleteProduct = (ctx) => {
    try {
        const id = ctx.params.id;

        deleteById(id);

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

const createProduct = async (ctx) => {
    try {
        const timestamp = new Date().getTime(); // Lấy timestamp

        const randomValue = Math.floor(Math.random() * 1000); // Số ngẫu nhiên

        const idProduct = `${timestamp}${randomValue}`;

        const createdAt = new Date().toISOString();

        const product = { id: idProduct, createdAt, ...ctx.request.body };

        add(product);
        ctx.body = {
            success: true,
            message: `Product with ID ${product.id} has been created`,
            product
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

const getProductById = (ctx) => {
    try {
        const product = getOne(ctx.params.id);

        const fieldUrl = ctx.query.fields;

        console.log(fieldUrl);

        if (fieldUrl) {
            const field = fieldUrl.split(',');

            const productOne = {};

            field.forEach(field => {
                if (product[field] !== undefined) {

                    productOne[field] = product[field];
                }
            })

            ctx.body = {
                data: productOne
            };
        } else {
            ctx.body = {
                data: product
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
    createProduct,
    getProductById,
    updateProduct
}

