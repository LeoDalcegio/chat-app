const removeDuplicatesFromArray = (array) => {
    return array.filter((a, b) => array.indexOf(a) === b)
};

module.exports = removeDuplicatesFromArray;