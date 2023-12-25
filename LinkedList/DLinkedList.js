class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.dummy = new Node(null); // Initialized with null data
        this.dummy.prev = this.dummy;
        this.dummy.next = this.dummy;
        this.n = 0;
    }

    getNode(index) {
        let current = this.dummy;
        if (index < this.n / 2) {
            for (let i = 0; i <= index; i++) {
                current = current.next;
            }
        } else {
            for (let i = this.n; i > index; i--) {
                current = current.prev;
            }
        }
        return current;
    }

    get(index) {
        if (index < 0 || index >= this.n) {
            throw new Error("Index out of bounds");
        }
        return this.getNode(index).data;
    }
    
    set(index, data) {
        if (index < 0 || index >= this.n) {
            throw new Error("Index out of bounds");
        }
        let node = this.getNode(index);
        let oldData = node.data;
        node.data = data;
        return oldData;
    }

    add(index, data) {
        if (index < 0 || index > this.n) {
            throw new Error("Index out of bounds");
        }
        let node = this.getNode(index);
        let newNode = new Node(data);
        newNode.prev = node.prev;
        newNode.next = node;
        node.prev.next = newNode;
        node.prev = newNode;
        this.n++;
    }

    remove(index) {
        if (index < 0 || index >= this.n) {
            throw new Error("Index out of bounds");
        }
        let node = this.getNode(index);
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.n--;
        return node.data;
    }

    isEmpty() {
        return this.n === 0;
    }

    size() {
        return this.n;
    }

    printList() {
        let current = this.dummy.next;
        let result = '';
        while (current !== this.dummy) { // Corrected to check against dummy
            result += current.data + ' -> ';
            current = current.next;
        }
        result += 'null';
        console.log(result);
    }
}

function testLinkedList() {
    console.log("Testing LinkedList");

    let ll = new LinkedList();

    console.log("Adding elements");
    ll.add(0, "a"); 
    ll.add(1, "b"); 
    ll.add(2, "c"); 

    console.log("Initial list:");
    ll.printList();

    console.log("Getting element at index 1:", ll.get(1)); 

    console.log("Setting element at index 1 to 'x'");
    ll.set(1, "x"); 

    console.log("List after setting:");
    ll.printList();

    console.log("Removing element at index 2");
    ll.remove(2); 

    console.log("List after removal:");
    ll.printList();

    console.log("Size of the list:", ll.size());
    console.log("Is the list empty?", ll.isEmpty());
}

testLinkedList();
