class DataPoint extends Point {   
    constructor(x, y, classId) {
        super(x, y);
        this.classId = classId;
    }
    
    show() {
        strokeWeight(6);
        fill(255);
        
        if (this.classId == 1) {
            stroke(0, 0, 225);
        } else if (this.classId == -1) {
            stroke(0, 125, 0);
        } else {
            stroke(170);
        }
        
        ellipse(this.getx(), this.gety(), 24);
    }
}
