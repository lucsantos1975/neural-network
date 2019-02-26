class Perceptron {
    constructor() {
        this.weights = [0, 0, 0];
        this.sum = 0;
        this.output = 0;
    
        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i] = random(-1, 1);
        }
    }
    
    doSum(inputs) {
        let sum = 0;
        
        for (let i = 0; i < this.weights.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        
        this.sum = sum;
    }
    
    doActivation() {
        if (this.sum >= 0) {
            this.output = 1;
        } else {
            this.output = -1;
        }
    }
    
    process(inputs) {
        this.doSum(inputs);
        this.doActivation();
    }
}
