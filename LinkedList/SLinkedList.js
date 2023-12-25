class Node
    {
        constructor(data)
        {
            this.data = data;
            this.next = null;
        }
    }


class LinkedList
{
    constructor()
    {
        this.head = null;
        this.tail = null;
        this.n = 0;
    }


    addBack(data) {
        let newNode = new Node(data);
    
        if (this.tail === null) {
            // If the list is empty, set both head and tail to the new node
            this.head = this.tail = newNode;
        } else {
            // Otherwise, add the new node at the end
            this.tail.next = newNode;
            this.tail = newNode;
        }

        ++this.n;
    }
    

    addFront(data) {
        let newNode = new Node(data);
    
        if (this.head === null) {
            // If the list is empty, set both head and tail to the new node
            this.head = this.tail = newNode;
        } else {
            // Otherwise, add the new node at the beginning
            newNode.next = this.head;
            this.head = newNode;
        }
        ++this.n;
    }
    


    removeFront() {
        // Check if the list is empty
        if (this.head === null) return null;
    
        // Store the data to return
        const removedData = this.head.data;
    
        // Update the head to the next node
        this.head = this.head.next;
    
        // If the list is now empty, update the tail if it exists
        if (this.head === null && this.tail) this.tail = null;
    
        --this.n;
        return removedData;
    }


    size() {return this.n;}


    toString() {
        let currentNode = this.head;
        let str = '';

        while (currentNode !== null) {
            // Added a marker for the head of the list
            if (currentNode === this.head) {
                str += 'Head -> ';
            }

            str += `${currentNode.data}`;

            // Added a marker for the tail of the list
            if (currentNode === this.tail) {
                str += ' <- Tail';
            }

            str += ' -> ';
            currentNode = currentNode.next;
        }

        return str + 'null';
    }

    
}
