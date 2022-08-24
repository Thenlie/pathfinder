const clearMaze = (l, w, t) => {
    // remove current maze styling
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < w; j++) {
            let el;
            if (t === 1) { el = document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0')) }
            else if (t === 2) { el = document.getElementById('s' + String(i).padStart(2, '0') + 's' + String(j).padStart(2, '0')) }
            else { el = document.getElementById('d' + String(i).padStart(2, '0') + 'd' + String(j).padStart(2, '0')) }
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

const animateCells = async (x, y) => {
    // fill cell with red -> blue -> yellow
    let el = document.getElementById('s' + String(x).padStart(2, '0') + 's' + String(y).padStart(2, '0')).firstChild;
    if (el.style.backgroundColor === "rgb(211, 211, 211)") { el.style.backgroundColor = "rgb(242, 87, 87)" } 
    else if (el.style.backgroundColor === "rgb(242, 87, 87)") { el.style.backgroundColor = "rgb(42, 110, 219)" } 
    else if (el.style.backgroundColor === "rgb(42, 110, 219)") { el.style.backgroundColor = "#F2E863" }
    await new Promise(resolve => setTimeout(resolve, 75));
}

const animateWalls = (x, y, stack, curr, prev) => {
    // remove walls of current and previous node
    let currEl = document.getElementById('d' + String(x).padStart(2, '0') + 'd' + String(y).padStart(2, '0'));
    let prevEl = document.getElementById('d' + String(stack[stack.length-1].x).padStart(2, '0') + 'd' + String(stack[stack.length-1].y).padStart(2, '0'));
    if (curr.x < prev.x) { currEl.style.borderBottom = "none";  prevEl.style.borderTop = "none" }
    else if (curr.x > prev.x) { currEl.style.borderTop = "none";  prevEl.style.borderBottom = "none" } 
    else if (curr.y < prev.y) { currEl.style.borderRight = "none"; prevEl.style.borderLeft = "none" }
    else if (curr.y > prev.y) { currEl.style.borderLeft = "none"; prevEl.style.borderRight = "none" }
}

const animateCurrentNode = async (x, y) => {
    // current node flashes yellow
    let el = document.getElementById('d' + String(x).padStart(2, '0') + 'd' + String(y).padStart(2, '0')).firstChild
    el.style.backgroundColor = '#F2E863'
    await new Promise(resolve => setTimeout(resolve, 75));
    el.style.backgroundColor = 'lightgray'
}

const toggleButtons = (page, state) => {
    // add or remove 'start' and 'clear' buttons under mazes
    if (page === 2) {
        !state ? document.querySelector('.maze-btn-container-one').style.display = 'none' : document.querySelector('.maze-btn-container-one').style.display = 'flex';       
    } else if (page === 3) {
        !state ? document.querySelector('.maze-btn-container-two').style.display = 'none' : document.querySelector('.maze-btn-container-two').style.display = 'flex';  
    }
}

export { clearMaze, styleMaze, animateCells, animateWalls, animateCurrentNode, toggleButtons };