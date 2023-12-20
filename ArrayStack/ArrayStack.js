class ArrayStack {
    constructor() {
        this.data = new Array(1);
        this.numOfElements = 0;
    }

    push(element) {
        if (this.numOfElements >= this.data.length) {
            this.#resize();
        }
        this.data[this.numOfElements] = element;
        this.numOfElements++;
    }

    pop() {
        if (this.numOfElements === 0) {
            console.log("Stack is empty");
            return;
        }
        let removedElement = this.data[this.numOfElements - 1];
        this.data[this.numOfElements - 1] = undefined;
        this.numOfElements--;
        if (this.data.length >= 3 * this.numOfElements) {
            this.#shrink();
        }
        return removedElement;
    }

    get(index) {
        if (index < 0 || index >= this.numOfElements) {
            console.log("Invalid index");
            return undefined;
        }
        return this.data[index];
    }

    contains(element) {
        for (let i = 0; i < this.numOfElements; i++) {
            if (this.data[i] === element) {
                return true;
            }
        }
        return false;
    }

    size() {
        return this.numOfElements;
    }

    clear() {
        this.data = new Array(1);
        this.numOfElements = 0;
    }

    toString() {
        let str = "Stack: ";
        for (let i = 0; i < this.numOfElements; i++) {
            str += this.data[i] + " ";
        }
        return str.trim();
    }

    #resize() {
        let newArr = new Array(this.data.length * 2);
        for (let i = 0; i < this.data.length; i++) {
            newArr[i] = this.data[i];
        }
        this.data = newArr;
    }

    #shrink() {
        let newArr = new Array(Math.max(1, Math.floor(this.numOfElements * 1.5)));
        for (let i = 0; i < this.numOfElements; i++) {
            newArr[i] = this.data[i];
        }
        this.data = newArr;
    }
}
