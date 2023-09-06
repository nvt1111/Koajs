const fieldData = (object, fields) => {
    const fieldUrl = fields.split(',');
    const objectNew = {};
    fieldUrl.forEach(field => {
        if (object[field]) {
            objectNew[field] = object[field]
        }

    });
    return objectNew;
}

export default fieldData;