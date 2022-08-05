const create2dArray = (l, w) => {
    // create 2D array of 0's
    let arr2D = [];
    for (let i = 0; i < l; i++) {
        arr2D.push([]);
    }
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < w; j++) {
            if (arr2D[i]) {
                arr2D[i].push(0)
            } 
        }
    }
    return arr2D;
};

export { create2dArray };