import {
    getOne, getProducts, add,
    updateById, deleteById,
} from '../database/productRepository.js';


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

        const data = ctx.request.body

        add(data);

        ctx.body = {
            success: true,
            message: `Product with ID ${data.id} has been created`,
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

const getProductById = (ctx) => {
    try {
        const fields = ctx.query.fields;
        const { id } = ctx.params;
        const data = getOne({ id, fields });
        console.log(data);

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

