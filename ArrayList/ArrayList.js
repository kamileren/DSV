class ArrayList
{
    constructor()
    {
        this.data = [];
    }   

    add(element)
    {
        //add the element to the end of our array
        this.data.push(element);
    }

    get(index)
    {
        return this.data[index];
    }

    set(element,index)
    {
        let temp = this.data[index];
        this.data[index] = element;
        return temp;
    }

    remove()
    {
        return this.data.pop();
    }

    addAt(index, element) {

        if (index < 0 || index > this.data.length) {
            console.log("Invalid index");
            return;
        }

        // Shift elements to the right
        for (let i = this.data.length; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }

        // Insert the new element and increase the size
        this.data[index] = element;
    }

    removeAt(element) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] == element) {
                let temp = this.data[i];
    
                // Shift elements to the left
                for (let j = i; j < this.data.length - 1; j++) {
                    this.data[j] = this.data[j + 1];
                }
    
                // Remove the last duplicated element
                this.data.length--;
    
                return temp;
            }
        }
        console.log("Element not found");
    }

}



function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}   

// Debug flag
const debug = true; // Set to true to enable debug logs, false to disable

// Test setup for numbers
let numberList = new ArrayList();
let numOfNumberElements = 10; // Can be changed for different tests

// Adding numbers to the list
for (let i = 0; i < numOfNumberElements; i++) {
    numberList.add(i);
    if (debug) console.log(`Added ${i} to the list.`);
}

// Randomly remove elements
for (let i = 0; i < numOfNumberElements / 2; i++) {
    let indexToRemove = getRandomIndex(numberList.data.length);
    let removed = numberList.removeAt(numberList.get(indexToRemove));
    if (debug) console.log(`Removed element ${removed} at index ${indexToRemove}.`);
}

// Randomly update elements
for (let i = 0; i < numOfNumberElements / 2; i++) {
    let indexToSet = getRandomIndex(numberList.data.length);
    let oldValue = numberList.get(indexToSet);
    numberList.set(indexToSet + 100, indexToSet);
    if (debug) console.log(`Updated element at index ${indexToSet} from ${oldValue} to ${indexToSet + 100}.`);
}

// Test for remaining and updated elements
let numberTestPassed = true;
for (let i = 0; i < numberList.data.length; i++) {
    let element = numberList.get(i);
    if (typeof element !== "number" || (element < 0 && element >= 100)) {
        numberTestPassed = false;
        break;
    }
}

console.log("Number Test with Random Removes and Sets:", numberTestPassed);
