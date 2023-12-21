const arrayStack = new ArrayStack();
const elementInput = document.getElementById('element-input');
const arrayDisplay = document.getElementById('array-display');
const sidebar = document.getElementById('sidebar');
    

document.getElementById('push-btn').addEventListener('click', () => {
    arrayStack.push(elementInput.value);
    updateDisplay();
});

document.getElementById('pop-btn').addEventListener('click', () => {
    arrayStack.pop();
    updateDisplay();
});

document.getElementById('make-array-btn').addEventListener('click', () => {

    for (let i = 0; i < 10; i++) {
        arrayStack.push(i);
    }
    updateDisplay();
    //toggleSidebar(true); // Toggle sidebar when array is created
});

function updateDisplay() {
    console.log(arrayStack)
    arrayDisplay.textContent = 'ArrayStack: [' + arrayStack.data.join(', ') + ']';
    displayArray();
 }
 function displayArray() {
    const arrayTitle = document.getElementById('array-stack-title');
    arrayTitle.innerHTML = '';

    const heading = document.createElement('h2');
    heading.textContent = 'arrayStack Visualization';
    arrayTitle.appendChild(heading);

    const arrayDisplay = document.getElementById('array-display');
    arrayDisplay.innerHTML = ''; // Clear existing content

    arrayStack.data.forEach((element) => {
        // Skip undefined elements
        if (element !== undefined) {
            const elementContainer = document.createElement('div');
            elementContainer.className = 'array-element';
            elementContainer.textContent = `${element}`;
            arrayDisplay.appendChild(elementContainer);
        }
    });
}
document.getElementById('clear-array-btn').addEventListener('click', () => {
    
    arrayStack.clear();
    updateDisplay();
    //toggleSidebar(false); // Revert sidebar when array is cleared
});

updateDisplay()