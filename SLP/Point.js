class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    getx() {
        return map(this.x, -1, 1, 0, width);
    }
    
    gety() {
        return map(this.y, -1, 1, height, 0);
    }
}
