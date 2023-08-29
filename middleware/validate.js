// const yup = require('yup');
import * as yup from 'yup';

export default async function validateProduct(ctx, next) {
    try {
        const postData = ctx.request.body;
        let schema = yup.object().shape({
            id: yup.number().positive().integer().required(),
            name: yup.string().required(),
            price: yup.number().positive().required(),
            description: yup.string(),
            product: yup.string(),
            createdAt: yup.date().required(),
            image: yup.string().url().required()
        });

        await schema.validate(postData);
        next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name,
            errorprice: e.price
        }
    }

}


// module.exports = validateProduct;