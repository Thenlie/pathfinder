const clearMaze = (l, w) => {
    // remove current maze styling
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < w; j++) {
            if (i !== 0 || j !== 0) { // not start cell
                if (i !== l-1 || j !== w-1) { // not finish cell
                    // style HTML
                    let el = document.getElementById(String(i).padStart(2, '0') + String(j).padStart(2, '0'));
                    el.firstChild.style.backgroundColor = "lightgray";
                }
            }
        }
    }
}

export { clearMaze };