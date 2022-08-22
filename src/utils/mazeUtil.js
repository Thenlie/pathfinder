const clearMaze = (l, w) => {
    // remove current maze styling
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < w; j++) {
            // style HTML
            let el = document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0'));
            el.style.border = "1px solid black";
            el.firstChild.style.backgroundColor = "lightgray";
        }
    }
};

const styleMaze = (arr2D) => {
    // remove borders according to 2D array
    for (let i = 0; i < arr2D.length; i++) {
        for (let j = 0; j < arr2D[0].length; j++) {
            if (!arr2D[i][j].top) { document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderTop = "none" }
            if (!arr2D[i][j].bottom) { document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderBottom = "none" }
            if (!arr2D[i][j].left) { document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderLeft = "none" }
            if (!arr2D[i][j].right) { document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')).style.borderRight = "none" }
        }
    }
}

export { clearMaze, styleMaze };