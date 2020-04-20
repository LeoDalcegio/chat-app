const removeDuplicatesFromArray = (array) => {
    const uniqueSet = new Set(array);

    return [...uniqueSet];
};

module.exports = removeDuplicatesFromArray;