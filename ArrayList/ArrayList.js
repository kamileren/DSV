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

    /**
     * Adds an element to a specific index in the array
     * @param {number} index the index where the element is added at
     * @param {any} element the element being added to the index
     * @returns 
     */
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

    remove()
    {
        return this.data.pop();
    }

    removeElement(element) {
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