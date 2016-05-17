'use strict';

module.exports = function makeTree(arr) {
    const idMap = arr.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {});

    let index = arr.length - 1;
    const result = [];

    while(index >= 0) {
        const parent = idMap[arr[index].parentId];
        if(parent) {
            parent.children = parent.children || [];
            parent.children.unshift(arr[index]);
        }else {
            result.unshift(arr[index]);
        }
        --index;
    }
    return result;
};
