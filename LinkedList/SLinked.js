const linkedList = new LinkedList();
const elementInput = document.getElementById('element-input');
const arrayDisplay = document.getElementById('array-display');
const sidebar = document.getElementById('sidebar');

function updateDisplay() {
    const display = document.getElementById('linked-list-display');
    display.innerHTML = '';
    let current = linkedList.head;
    while (current) {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'list-node';
        nodeElement.textContent = current.data;
        display.appendChild(nodeElement);

        if (current.next) {
            const linkElement = document.createElement('div');
            linkElement.className = 'list-link';
            display.appendChild(linkElement);
        }

        current = current.next;
    }
}


// Event listeners for buttons
document.getElementById('add-back-btn').addEventListener('click', () => {
    const data = document.getElementById('element-input').value;
    linkedList.addBack(data);
    updateDisplay();
});

document.getElementById('add-front-btn').addEventListener('click', () => {
    const data = document.getElementById('element-input').value;
    linkedList.addFront(data);
    updateDisplay();
});

document.getElementById('remove-btn').addEventListener('click', () => {
    linkedList.removeFront();
    updateDisplay();
});

document.getElementById('clear-list-btn').addEventListener('click', () => {
    while (linkedList.size() > 0) {
        linkedList.removeFront();
    }
    updateDisplay();
});

document.getElementById('make-list-btn').addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        linkedList.addBack(i);
    }
    updateDisplay();
});

// Initialize the display
updateDisplay();