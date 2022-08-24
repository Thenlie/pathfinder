import { MazeCell } from "../lib/MazeCell.js";

const create2dArray = (length, width) => {
    // create 2D array of MazeCell's 
    let arr2D = [];
    for (let i = 0; i < length; i++) {
        arr2D.push([]);
    }
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
            if (arr2D[i]) {
                arr2D[i].push(new MazeCell(i, j, false, true, true, true, true,))
            } 
        }
    }
    return arr2D;
}

const checkPosition = (arr2D, x, y) => {
    // return value of (x, y) in 2D array
    if (arr2D[x]) {
        if (arr2D[x][y]) {
            return !arr2D[x][y].visited;
        }
    }
    return false;
};

const checkSurroundings = (arr2D, x, y) => {
    // check for available directions to move
    let arr = [];
    if (checkPosition(arr2D, x-1, y)) { arr.push('U') };
    if (checkPosition(arr2D, x+1, y)) { arr.push('D') };
    if (checkPosition(arr2D, x, y-1)) { arr.push('L') };
    if (checkPosition(arr2D, x, y+1)) { arr.push('R') };
    return arr;
};

export { create2dArray, checkPosition, checkSurroundings };