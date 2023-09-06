
export default function pickFields(data, fields) {
    // example: fields = [id, name, description]
    const fieldsObj = fields.reduce((prev, key) => {
        if (data[key]) {
            prev[key] = data[key];
        }
        return prev;
    }, {});
    return fieldsObj;
}