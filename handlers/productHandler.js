import { getOne, getAll, add, updateById, deleteById } from '../database/productRepository.js';
import fs from 'fs';

const testdata = fs.readFileSync('./database/products.json', 'utf-8');
const productData = JSON.parse(testdata);//Object
const products = productData.data;

const productList = async (ctx) => {
    try {
        const limit = parseInt(ctx.query.limit) || products.length;
        const allProducts = [...products];
        const productList = allProducts.slice(0, limit).map(item => item);
        ctx.body = {
            data: productList
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

//todo: phần này đẩy vào xử lí trong repository nhé không 

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
        const productList = allProducts.slice(0, limit);
        productList.sort((a, b) => {
            if (ctx.query.sort === 'desc') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else {
                return new Date(a.createdAt) - new Date(b.createdAt); // Thêm 'return' ở đây
            }
        })
        ctx.body = {
            data: productList
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

//todo: viết cách ra cho dễ đọc nhé , chưa dùng next thì chưa cần truyền vào đâu nó thành thừa đất 
//try catch ở hàm này luôn các hàm ở trong chuyển vào xử lí bên trong repository nhé và chỉ cần viết 1 hàm thôi không biết quà nhiều hàm thế kia đâu 
const handelGetProduct = (ctx, next) => {
    const limit = parseInt(ctx.query.limit);
    const sort = ctx.query.sort;

    //todo : không viết như này nhé, tách ra từng hàm if riêng chứ không dùng if else thế này , dễ bị sót trường hợp
    // và không viết !limit chứ không viết limit !== undefined nhé  
    if (limit !== undefined) {
        productList(ctx);
    } else if (sort !== undefined) {
        sortProduct(ctx);
    } else if (limit !== undefined && sort !== undefined) {
        sortAndLimitProduct(ctx);
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

const getProductByID = (ctx) => {
    try {
        const product = getOne(ctx.params.id);
        const fieldUrl = ctx.query.field;
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
    getProductByID,
    updateProduct
}

