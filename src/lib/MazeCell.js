class MazeCell {
    constructor(x, y, visited, top, right, bottom, left) {
        this.x = x; // x coordinate location -- INT
        this.y = y; // y coordinate location -- INT
        this.visited = visited; // checked in search, defaults to False -- BOOL
        this.top = top; // true if wall, false if air --  BOOL
        this.right = right; // ^
        this.bottom = bottom; // ^
        this.left = left; // ^
    }
    getLocation() {
        return { x: this.x, y: this.y };
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