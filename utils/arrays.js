/**
 * Find the place to insert a value in a sorted list
 * @param { array [number] } array 
 * @param { number } value 
 */
const sortedIndex = (array, value) => {
    let low = 0,
        high = array.length;

    while (low < high) {
        let mid = low + high >>> 1; // binary division by 2
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
}

/**
 * Find the place to insert an item in a sorted list of items comparing their first value
 * @param { array [array] } array 
 * @param { array } item 
 */
const sortedItemIndex = (array, item) => {
    var low = 0,
        high = array.length;

    while (low < high) {
        var mid = low + high >>> 1;
        if (array[mid][0] < item[0]) low = mid + 1;
        else high = mid;
    }
    return low;
}

/**
 * Insert an item in a sorted array of numbers comparing their value
 * @param { array [number] } array sorted list
 * @param { number } element 
 */
const insert = (array, element) => {
    array.splice(sortedIndex(array, element), 0, element);
    return array;
}

/**
 * Insert an item in a sorted array of arrays comparing their first item
 * @param { array [array] } array sorted list
 * @param { array } item 
 */
const insertItem = (array, item) => {
    // insert only if item is an array of length 2
    if (item.length && item.length == 2) array.splice(sortedItemIndex(array, item), 0, item);
    return array;
}

module.exports = {
    sortedIndex,
    sortedItemIndex,
    insert,
    insertItem
}