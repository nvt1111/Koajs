const sortProduct = (value, data) => {
    data.sort((a, b) => (value === 'desc') ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt));
    return data;
}

export default sortProduct;