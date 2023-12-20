class ArrayList
{
    colors = new Array();

    constructor()
    {
        this.data = new Array(1);   
        this.numOfNumberElements = 0;
        this.colors = new Array(this.data.length).fill('');

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
        updateDisplay();
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
    
        const tempColor = "#f07a7a";
        const tempColor2 = "#cf5757";
        const tempColor3 = "#8ca2de";
        if (this.numOfNumberElements > 0) {
            this.colors[this.numOfNumberElements - 1] = tempColor;
        }

        this.colors[this.numOfNumberElements-1] = tempColor;
            
        for (let i = this.numOfNumberElements; i > index; i--) {
            this.colors[i] = tempColor2;
            this.colors[i-1] = tempColor2;
            this.colors[i+1] = tempColor;

            this.data[i] = this.data[i - 1];
            updateDisplay(); // Update display to reflect the data shift
            await this.delay(250); // Delay for visualization    
        }
        
        
        this.data[index] = element;
        this.numOfNumberElements++;
        this.colors[index] = tempColor3;
        updateDisplay();
        await this.delay(250); // Delay for visualization 
        this.colors.fill(''); // Reset all colors to default   
        updateDisplay();

    
    }


    #getNthChild(parentId, n) {
        const parentDiv = document.getElementById(parentId);
        if (parentDiv && n >= 0 && n < parentDiv.children.length) {
            return parentDiv.children[n];
        } else {
            console.log("Invalid parent ID or index out of range");
            return null;
        }
    }
    
    
    
    


    async removeAt(index) {
        if (index < 0 || index >= this.numOfNumberElements) {
            console.log("Invalid index");
            return;
        }
        let removedElement = this.data[index];

        const arrayDisplays = 'array-display';


        const tempColor = "#f07a7a";
        const tempColor2 = "#cf5757";
        const tempColor3 = "#8ca2de";


        this.colors[index] = tempColor2;


        for (let i = index; i < this.numOfNumberElements; i++) {

            this.colors[i] = tempColor3;
            this.colors[i+1] =tempColor3;
            if(i >= index+1) this.colors[i-1] = tempColor;
            if(i >= index+2) this.colors[i-2] = tempColor;



            this.data[i] = this.data[i + 1];
            
            await this.delay(250); // Delay for visualization
            updateDisplay(); // Make sure this function reflects the changes in the UI


        }

        let lastElem = this.#getNthChild(arrayDisplays, this.numOfNumberElements - 1);
        if (lastElem) lastElem.style.backgroundColor = ""; // Reset the color or set it to default


        this.data[this.numOfNumberElements - 1] = undefined; // Set the last element to undefined
        this.numOfNumberElements--; // Decrement the count of elements

        if(this.data.length >= 3 * this.numOfNumberElements) this.#shrink();
        this.colors.fill(''); // Reset all colors to default   
        updateDisplay();
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