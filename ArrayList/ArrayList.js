class ArrayList
{

    constructor()
    {
        this.data = new Array(1);   
        this.numOfNumberElements = 0;
    }   


    get(index)
    {
        if (index < 0 || index > this.numOfNumberElements-1) {
            console.log("Invalid index");
            return;
        }

        return this.data[index];
    }

    set(element,index)
    {

        if (index < 0 || index > this.numOfNumberElements-1) {
            console.log("Invalid index");
            return;
        }
        
        let temp = this.data[index];
        this.data[index] = element;
        return temp;
    }

    add(element) {
        if (this.numOfNumberElements >= this.data.length) {
            this.#resize();
        }
        this.data[this.numOfNumberElements] = element;
        this.numOfNumberElements++;
    }


    remove() {
        if (this.numOfNumberElements === 0) {
            console.log("Array is empty");
            return;
        }
        console.log('Removing last element');
        let temp = this.data[this.numOfNumberElements - 1];
        this.data[this.numOfNumberElements - 1] = undefined;
        --this.numOfNumberElements;
    
        if(this.data.length>=3*this.numOfNumberElements) this.#shrink();

    
        return temp;
    }
    

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Asynchronous addAt function
    async addAt(index, element) {
        if (index < 0 || index > this.numOfNumberElements) {
            console.log("Invalid index");
            return;
        }
    
        if (this.numOfNumberElements === this.data.length || index === this.numOfNumberElements) {
            this.#resize();
        }
    
        // Shift elements to the right
        for (let i = this.numOfNumberElements; i > index; i--) {
            this.data[i] = this.data[i - 1];
            updateDisplay();
            await this.delay(200); // Delay for visualization
        }
    
        // Insert the new element
        this.data[index] = element;
        this.numOfNumberElements++;
        updateDisplay(); // Update display after insertion
    }
    


    async removeAt(index) {
        if (index < 0 || index >= this.numOfNumberElements) {
            console.log("Invalid index");
            return;
        }
        let removedElement = this.data[index];
        for (let i = index; i < this.numOfNumberElements; i++) {
            this.data[i] = this.data[i + 1];
            updateDisplay();
            await this.delay(250); // Delay for visualization
        }
        this.data[this.numOfNumberElements - 1] = undefined; // Set the last element to undefined
        this.numOfNumberElements--; // Decrement the count of elements
        if(this.data.length>=3*this.numOfNumberElements) this.#shrink();
        return removedElement;
    }

    size()
    {
        return numOfNumberElements;
    }

    contains(element)
    {
        for(let i = 0; i<this.numOfNumberElements-1;i++)
        {
            if(this.data[i] === element)
            {
                return true;
            }
        }

        return false;
    }


    indexOf(element)
    {

        for(let i = 0; i<this.numOfNumberElements-1;i++)
        {
            if(this.data[i] === element)
            {
                return i;
            }
        }
        return "Does not Exist"
    }


    subList(start,end)
    {
        let a = new ArrayList();
        for (let i = start; i < end; i++) {
            sublist.add(this.get(i));
        }
    

        return a;
    }

    clear()
    {
        this.data = new Array(1);
    }




    #resize() {
        let newArr = new Array(this.data.length * 2);
        for (let i = 0; i < this.data.length; i++) {
            newArr[i] = this.data[i];
        }
        this.data = newArr;
    }


    #shrink()
    { 
        console.log("shrink");
        let newArr = new Array(Math.floor(this.numOfNumberElements*(1/3)))
        for(let i = 0; i< this.numOfNumberElements;i++)
        {
            newArr[i] = this.data[i];
        }

        this.data = newArr;
    }


    

}