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

    toArray() {
        let current = this.dummy;
        let result = [{data: null, dummy: true}]; // Include the dummy node with a 'dummy' property
        while (current.next !== this.dummy) {
            current = current.next;
            result.push({data: current.data, dummy: false}); // Regular nodes have 'dummy: false'
        }
        return result;
    }
}