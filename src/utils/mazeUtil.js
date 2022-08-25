const clearMaze = (l, w, t) => {
    // remove current maze styling
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < w; j++) {
            // style HTML
            let el;
            if (t === 1) {
                el = document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0'));
            } else if (t === 2) {
                el = document.getElementById('s' + String(i).padStart(2, '0') + 's' + String(j).padStart(2, '0'));
            } else {
                el = document.getElementById('d' + String(i).padStart(2, '0') + 'd' + String(j).padStart(2, '0'));                
            }
            el.style.border = "1px solid black";
            el.firstChild.style.backgroundColor = "rgb(211, 211, 211)";
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

const styleMazeCells = (arr2D) => {
  // remove borders according to 2D array
  for (let i = 0; i < arr2D.length; i++) {
    for (let j = 0; j < arr2D[0].length; j++) {
      if (arr2D[i][j].visited) {
        document.getElementById(
          String(i).padStart(2, '0') + String(j).padStart(2, '0')
        ).firstChild.style.backgroundColor = 'rgb(42, 110, 219)';
      }
    }
  }
};

const animateCells = (x, y) => {
    let el = document.getElementById('s' + String(x).padStart(2, '0') + 's' + String(y).padStart(2, '0')).firstChild
    if (el.style.backgroundColor === "rgb(211, 211, 211)") {
        el.style.backgroundColor = "rgb(242, 87, 87)";
    } else if (el.style.backgroundColor === "rgb(242, 87, 87)") {
        el.style.backgroundColor = "rgb(42, 110, 219)"
    } else if (el.style.backgroundColor === "rgb(42, 110, 219)") {
        el.style.backgroundColor = "#F2E863"
    }
}

const animateWalls = (x, y, stack, curr, prev) => {
    let currEl = document.getElementById('d' + String(x).padStart(2, '0') + 'd' + String(y).padStart(2, '0'));
    let prevEl = document.getElementById('d' + String(stack[stack.length-1].x).padStart(2, '0') + 'd' + String(stack[stack.length-1].y).padStart(2, '0'));
    if (curr.x < prev.x) { // up
        currEl.style.borderBottom = "none" 
        prevEl.style.borderTop = "none" 
    } else if (curr.x > prev.x) { // down
        currEl.style.borderTop = "none" 
        prevEl.style.borderBottom = "none" 
    } else if (curr.y < prev.y) { // left
        currEl.style.borderRight = "none" 
        prevEl.style.borderLeft = "none" 
    } else if (curr.y > prev.y) { // right
        currEl.style.borderLeft = "none" 
        prevEl.style.borderRight = "none" 
    } 
}

export { clearMaze, styleMaze, styleMazeCells, animateCells, animateWalls };