var pc;

var trainingDataPointsCount = 200;
var testDataPointsCount = 50;

var trainingDataPoints = [];
var testDataPoints = [];

var trainingDataPointCurrentIndex = 0;

var epoch = 0;

var isTraining = false;
var trained = false;
var isTesting = false;

var bias = -1;
var learningRate = 0.005;

var f = linear;

var maxError = 0.02;

var currentError = 0;

function setup() {
    var canvas = createCanvas(800, 800);
    canvas.parent('canvasContainer');
    
    frameRate(10);

    pc = new Perceptron();
    
    for (let i = 0; i < trainingDataPointsCount; i++) {
        let x = random(-1, 1);
        let y = random(-1, 1);
        let classId = y > f(x) ? 1 : -1;
        
        trainingDataPoints[i] = new DataPoint(x, y, classId);
    }
    
    for (let i = 0; i < testDataPointsCount; i++) {
        let x = random(-1, 1);
        let y = random(-1, 1);
        let classId;
        
        testDataPoints[i] = new DataPoint(x, y, classId);
    }
}

function draw() {
    background(215);

    drawAxis();
    
    drawDividerLine();
    
    let errorCount = 0;
    
    for (let i = 0; i < trainingDataPoints.length; i++) {
        trainingDataPoints[i].show();

        if (isTraining) {
            let inputs = [bias, trainingDataPoints[i].x, trainingDataPoints[i].y];
                    
            let target = trainingDataPoints[i].classId;
            
            pc.process(inputs);
                    
            if (pc.output == target) {
                fill(255);
            } else {
                fill(255, 0, 0);
                errorCount++;
            }
            
            if (isTraining && i == trainingDataPointCurrentIndex) {
                fill(0);
            }
                        
            noStroke();
            
            ellipse(trainingDataPoints[i].getx(), trainingDataPoints[i].gety(), 18);           
        }
        
        if (isTraining || trained) {
            drawLearningLine();
        }
    }
    
    if (!trained) {
        currentError = errorCount / trainingDataPointsCount;
    }
    
    if (isTraining) {
        train(trainingDataPoints[trainingDataPointCurrentIndex]);
        trainingDataPointCurrentIndex++;
        
        if (trainingDataPointCurrentIndex == trainingDataPoints.length) {
            trainingDataPointCurrentIndex = 0;
            epoch++;
        }
        
        if (currentError <= maxError) {
            isTraining = false;
            trained = true;
        }
    }
    
    if (isTesting) {
        test();
    }
}

function linear(x) {
    return -0.7 * x - 0.2;    
}

function nonLinear(x) {
    return 1.2 * x * x - 0.4 * x - 0.5;
}

function train(pt) {
    let inputs = [bias, pt.x, pt.y];
    
    pc.process(inputs);
        
    let error = pt.classId - pc.output;
                
    for (let i = 0; i < pc.weights.length; i++) {
        pc.weights[i] += error * inputs[i] * learningRate;
    }
    
    document.getElementById('epoch').innerHTML = epoch;
    document.getElementById('trainingDataPointCurrentIndex').innerHTML = trainingDataPointCurrentIndex;
    document.getElementById('inputs0').innerHTML = inputs[0];
    document.getElementById('inputs1').innerHTML = inputs[1];
    document.getElementById('inputs2').innerHTML = inputs[2];
    document.getElementById('target').innerHTML = pt.classId;
    document.getElementById('sum').innerHTML = pc.sum;
    document.getElementById('output').innerHTML = pc.output;
    document.getElementById('error').innerHTML = currentError;
    document.getElementById('weights0').innerHTML = pc.weights[0];
    document.getElementById('weights1').innerHTML = pc.weights[1];
    document.getElementById('weights2').innerHTML = pc.weights[2];
}

function test() {
    isTraining = false;
   
    for (let i = 0; i < testDataPoints.length; i++) {
        let inputs = [bias, testDataPoints[i].x, testDataPoints[i].y];
        
        pc.process(inputs);
        testDataPoints[i].classId = pc.output;
        
        stroke(255, 170, 0);
        strokeWeight(6);
        fill(255, 240, 0);            
        ellipse(testDataPoints[i].getx(), testDataPoints[i].gety(), 24);
        
        stroke(0);
        strokeWeight(1);
        fill(0);
        textSize(16);
        textAlign(CENTER, CENTER);
        text(testDataPoints[i].classId, testDataPoints[i].getx(), testDataPoints[i].gety());
    }
   
    noLoop(); 
}

function drawAxis() {
    strokeWeight(2);
    stroke(150);

    let ax1 = new Point(-1, 0);
    let ax2 = new Point(1, 0);
    line(ax1.getx(), ax1.gety(), ax2.getx(), ax2.gety());
    
    let ay1 = new Point(0, -1);
    let ay2 = new Point(0, 1);
    line(ay1.getx(), ay1.gety(), ay2.getx(), ay2.gety());
}

function drawDividerLine() {
    strokeWeight(4);
    stroke(255, 0, 0);
    
    let x1 = -1;
    let y1 = f(x1);
    let p1 = new Point(x1, y1);
    
    for (let i = -0.9; i <= 1; i += 0.1) {
        let x2 = i;
        let y2 = f(i);
        let p2 = new Point(x2, y2);
        
        line(p1.getx(), p1.gety(), p2.getx(), p2.gety());
        
        p1 = p2;
    }
}

function drawLearningLine() {
    strokeWeight(2);
    stroke(255, 0, 255);
    
    let p1 = new Point(-1, calculateLearnLineY(-1));
    let p2 = new Point(1, calculateLearnLineY(1));
    
    line(p1.getx(), p1.gety(), p2.getx(), p2.gety());
}

function calculateLearnLineY(x) {
    let w0 = pc.weights[0];
    let w1 = pc.weights[1];
    let w2 = pc.weights[2];

    return -(w1 / w2) * x - (w0 / w2) * bias;
}

