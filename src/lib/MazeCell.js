class MazeCell {
    constructor(x, y, visited, top, right, bottom, left) {
        this.x = x; // x coordinate location
        this.y = y; // y coordinate location
        this.visited = visited; // checked in search, defaults to False
        /*  -- true if wall, false if air --  */
        this.top = top; 
        this.right = right; 
        this.bottom = bottom; 
        this.left = left;
    }
    getLocation() {
        return { x: this.x, y: this.y }
    }
    wasVisited() {
        return this.visited;
    }
    hasTop() {
        return this.top;
    }
    hasRight() {
        return this.right;
    }
    hasBottom() {
        return this.bottom;
    }
    hasLeft() {
        return this.left;
    }
}