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


function testLinkedList() {
    const list = new LinkedList();
    const numOfElementsToAdd = 20;
    const numOfElementsToRemove = 12;

    // Adding elements to the list
    for (let i = 0; i < numOfElementsToAdd; i++) {
        list.addBack(i);
        console.log(`Added ${i} to the back. Current size: ${list.size()}`);
    }

    // Removing elements from the front
    for (let i = 0; i < numOfElementsToRemove; i++) {
        const removed = list.removeFront();
        console.log(`Removed ${removed} from the front. Current size: ${list.size()}`);
    }

    // Verifying the remaining elements
    console.log("Verifying remaining elements:");
    let currentNode = list.head;
    let index = numOfElementsToRemove;
    let isCorrect = true;
    while (currentNode !== null) {
        if (currentNode.data !== index) {
            console.error(`Error: Expected data ${index}, found ${currentNode.data}`);
            isCorrect = false;
            break;
        }
        console.log(currentNode.data);
        currentNode = currentNode.next;
        index++;
    }

    if (isCorrect && list.size() === (numOfElementsToAdd - numOfElementsToRemove)) {
        console.log("Test passed: LinkedList operations are correct.");
        console.log(list.toString());
    } else {
        console.error("Test failed: LinkedList operations are incorrect.");
    }
}



