const create2dArray = (length, width) => {
    // create 2D array of 0's 
    let arr2D = [];
    for (let i = 0; i < length; i++) {
        arr2D.push([]);
    }
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
            if (arr2D[i]) {
                arr2D[i].push(0)
            } 
        }
    }
    return arr2D;
};

const checkPosition = (arr2D, x, y) => {
    // return value of (x, y) in 2D array
    return ([0,'@'].includes(arr2D[x]?.[y]))?arr2D[x][y]:null;
};

export { create2dArray, checkPosition };
