import { MazeCell } from "../lib/MazeCell.js";
import { animateWalls } from "./mazeUtil.js";

const create2dArray = (length, width) => {
    // create 2D array of MazeCell's 
    let arr2D = [];
    for (let i = 0; i < length; i++) {
        arr2D.push([]);
    }
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
            if (arr2D[i]) { arr2D[i].push(new MazeCell(i, j, false, true, true, true, true,)) } 
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

const breakWalls = (arr2D, x, y, stack, page) => {
    // remove walls where current node is connected to prev node
    let curr = arr2D[x][y];
    let prev = arr2D[stack[stack.length-1].x][stack[stack.length-1].y];
    if (curr.x < prev.x) { curr.bottom = false; prev.top = false }
    else if (curr.x > prev.x) { curr.top = false; prev.bottom = false }
    else if (curr.y < prev.y) { curr.right = false; prev.left = false }
    else if (curr.y > prev.y) { curr.left = false; prev.right = false }
}

export { create2dArray, checkPosition, checkSurroundings, breakWalls };