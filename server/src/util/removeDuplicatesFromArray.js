const removeDuplicatesFromArray = (array) => {
    return array.splice(0, array.length, ...(new Set(array)))
};

module.exports = removeDuplicatesFromArray;