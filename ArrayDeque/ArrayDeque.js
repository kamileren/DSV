const FilledColour = "#08D9D6";
const EmptyColour = "#EEEEEE";
const startColour = "#00ADB5";
const selectedColour = "red";

class ArrayDeque {
    constructor() {
        this.data = new Array(4); // Starting with a larger initial size
        this.numOfElements = 0;
        this.start = 0; // Head of the deque
        this.colours = new Array(4);
        this.colours.fill(EmptyColour);
    }

    #getRealLocation(index) {
        return (this.start + index) % this.data.length;
    }

    isEmpty() {
        return this.numOfElements === 0;
    }

    size() {
        return this.numOfElements;
    }

    get(index) {
        if (index < 0 || index >= this.numOfElements) {
            throw new Error("Invalid index");
        }  
        return this.data[this.#getRealLocation(index)];
    }

    set(element, index) {
        if (index < 0 || index >= this.numOfElements) {
            throw new Error("Invalid index");
        }
        let realLocation = this.#getRealLocation(index);
        let temp = this.data[realLocation];
        this.data[realLocation] = element;
        return temp;
    }

    addFront(element) {
        // Resize if the deque is full
        if (this.numOfElements === this.data.length) this.#resize();
    
        if (this.isEmpty()) {
            // If the deque is empty, add the first element at index 0
            this.data[0] = element;
            this.colours[0] = FilledColour;
            this.start = 0;
            this.colours[this.start] = startColour;
        } else {
            // If the deque is not empty, decrement the start index and add the element
            this.colours[this.start] = FilledColour;
            this.start = (this.start === 0) ? this.data.length - 1 : this.start - 1;
            this.data[this.start] = element;
            this.colours[this.start] = startColour;
        }
    
        // Increment the number of elements
        this.numOfElements++;
        drawPieChart();
    }
    

    addBack(element) {
        if (this.numOfElements === this.data.length) this.#resize();
        this.data[this.#getRealLocation(this.numOfElements)] = element;

        if(this.numOfElements === 0) //if the first element is added from the back make sure the colour of the first added is start
        {
            this.colours[this.#getRealLocation(this.numOfElements)] = startColour;
        }
        else //else continue like normally
        {
            this.colours[this.#getRealLocation(this.numOfElements)] = FilledColour;
        }

        this.numOfElements++;
        drawPieChart();
    }

    removeFront() {
        if (this.isEmpty()) {
            throw new Error("Deque is empty");
        }
        let removedElement = this.data[this.start];
        this.data[this.start] = undefined;
        this.colours[this.start] = EmptyColour;
        this.start = (this.start + 1) % this.data.length;
        this.numOfElements--;
        if (this.data.length >= 3 * this.numOfElements) this.#shrink();
        this.colours[this.start] = startColour;
        return removedElement;
    }

    removeBack() {
        if (this.isEmpty()) {
            throw new Error("Deque is empty");
        }
        this.numOfElements--;
        let removedElement = this.data[this.#getRealLocation(this.numOfElements)];
        this.data[this.#getRealLocation(this.numOfElements)] = undefined;
        this.colours[this.#getRealLocation(this.numOfElements)] = EmptyColour;
        if (this.data.length >= 3 * this.numOfElements) this.#shrink();
        return removedElement;
    }

    clear() {
        this.data = new Array(4);
        this.numOfElements = 0;
        this.start = 0;
    }


    remove(index)
    {

        //check bounds
        if (index < 0 || index >= this.numOfNumberElements) {
            console.log("Invalid index");
            return;
        }

        //store the element at index
        let temp = this.data[this.#getRealLocation(index)];

        for(let i = index;index<this.numOfElements;i++)
        {
            //shift elements
            this.data[this.#getRealLocation(i)] = this.data[this.#getRealLocation(i+1)];
        }

        --this.numOfElements;
        this.data[this.numOfNumberElements - 1] = undefined; // Set the last element to undefined for the visualization

        if(this.data.length >= 3 * this.numOfElements) this.#shrink();//Shrink if needed

        return temp;//return the element at th index removed.

    }


    add(element,index)
    {
        //check bounds
        if (index < 0 || index > this.numOfNumberElements) {
            console.log("Invalid index");
            return;
        }

        //resize if there is no space anymore
        if (this.numOfElements === this.data.length) this.#resize();



        for(let i = this.numOfElements; i > index;i--)
        {
            //shift
            this.data[this.#getRealLocation(index+1)] = this.data[this.#getRealLocation(index)]
        }

        //change the element
        this.data[this.#getRealLocation(index)] = element;
        this.numOfElements++;
    }

    #resize() {
        let newSize = this.data.length * 2;
        let newArr = new Array(newSize);
        let newColArr = new Array(newSize);
        newColArr.fill(EmptyColour);
    
        // Rearrange elements in the new array based on their actual position in the circular buffer
        for (let i = 0; i < this.numOfElements; i++) {
            newArr[i] = this.data[this.#getRealLocation(i)];
            newColArr[i] = this.colours[this.#getRealLocation(i)];
        }

        

    
        this.data = newArr;
        this.colours = newColArr;
        this.start = 0; 

    
    }
    
    

    #shrink() {
        let newSize = Math.max(4    , this.data.length / 2);
        let newArr = new Array(newSize);
        let newColArr = new Array(newSize);
        newColArr.fill(EmptyColour);

        for (let i = 0; i < this.numOfElements; i++) {
            newArr[i] = this.data[this.#getRealLocation(i)];
            newColArr[i] = this.colours[this.#getRealLocation(i)];
        }
        this.data = newArr;
        this.colours = newColArr;
        this.start = 0;
    }
}


// function testArrayDeque() {
//     let deque = new ArrayDeque();
//     console.log("Initial Deque (Should be empty):", deque.isEmpty());

//     // Add elements to the back
//     deque.addBack(1);
//     deque.addBack(2);
//     deque.addBack(3);
//     console.log("After adding 1, 2, 3 to the back:", deque.size() === 3);

//     // Remove element from the front
//     console.log("Remove front (Should be 1):", deque.removeFront() === 1);

//     // Add elements to the front
//     deque.addFront(0);
//     console.log("After adding 0 to the front:", deque.get(0) === 0);

//     // Remove element from the back
//     console.log("Remove back (Should be 3):", deque.removeBack() === 3);

//     // Check size
//     console.log("Current size (Should be 2):", deque.size() === 2);

//     // Clear deque
//     deque.clear();
//     console.log("After clearing (Should be empty):", deque.isEmpty());

//     // Test resizing
//     for (let i = 0; i < 10; i++) {
//         deque.addFront(i);
//         console.log("Real Data:",deque.data);
//     }
//     console.log("After adding 10 elements (Size should be 10):", deque.size() === 10);

//     // Test get and set
//     console.log("Get element at index 5 (Should be 5):", deque.get(5) === 4);
//     console.log("Set element at index 5 to 50:", deque.set(50, 5) === 4);
//     console.log("Get new element at index 5 (Should be 50):", deque.get(5) === 50);

//     // Test edge cases
//     try {
//         deque.get(-1);
//         console.log("Getting element at negative index did not throw error.");
//     } catch (e) {
//         console.log("Getting element at negative index threw an error:", e.message);
//     }

//     try {
//         deque.set(100, 10);
//         console.log("Setting element at out-of-bound index did not throw error.");
//     } catch (e) {
//         console.log("Setting element at out-of-bound index threw an error:", e.message);
//     }
// }

// // Run the tester
// testArrayDeque();
