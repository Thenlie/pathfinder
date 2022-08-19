import { MazeCell } from "../lib/MazeCell.js";

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
    if (arr2D[x]) {
        if (arr2D[x][y] === 0) {
            return 0;
        } else if (arr2D[x][y] === '@') {
            return '@';
        }
    } 
    return null;
};

const createNew2dArray = (length, width) => {
    // create 2D array of MazeCell's 
    let arr2D = [];
    for (let i = 0; i < length; i++) {
        arr2D.push([]);
    }
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
            if (arr2D[i]) {
                arr2D[i].push(new MazeCell(i, j, false, (i == 0 ? true:false), (j == width-1 ? true:false), (i == length-1 ? true:false), (j == 0 ? true:false)))
            } 
        }
    }
    return arr2D;
}

console.log(createNew2dArray(20, 20));

export { create2dArray, checkPosition, createNew2dArray };