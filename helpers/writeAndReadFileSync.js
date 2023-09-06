import fs from 'fs';

const writeFileSync = (dataObject) => {
    fs.writeFileSync('./database/products.json', JSON.stringify({ data: dataObject }));
}

const readFileSync = () => {
    const testdata = fs.readFileSync('./database/products.json', 'utf-8');
    const productData = JSON.parse(testdata);//Object
    const products = productData.data;
    return products;
}

// không dùng export default
export {
    writeFileSync,
    readFileSync
}