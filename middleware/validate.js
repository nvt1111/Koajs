import * as yup from 'yup';

export default async function validateProduct(ctx, next) {
    try {
        const data = ctx.request.body;
        let schema = yup.object().shape({
            name: yup.string().required(),
            price: yup.number().positive().required(),
            description: yup.string(),
            product: yup.string(),
            createdAt: yup.date(),
            image: yup.string().url().required()
        });

        await schema.validate(data);
        return next();
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

