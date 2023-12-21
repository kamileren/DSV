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
    heading.textContent = 'ArrayStack Visualization';
    arrayTitle.appendChild(heading);

    const arrayDisplay = document.getElementById('array-display');
    arrayDisplay.innerHTML = ''; // Clear existing content

    const isVerticalLayout = arrayDisplay.classList.contains('vertical-layout');

    // Function to create and append element container
    const appendElement = (element) => {
        const elementContainer = document.createElement('div');
        elementContainer.className = 'array-element';
        elementContainer.textContent = `${element}`;
        arrayDisplay.appendChild(elementContainer);
    };

    // Iterate based on layout
    if (isVerticalLayout) {
        for (let i = arrayStack.data.length - 1; i >= 0; i--) {
            if (arrayStack.data[i] !== undefined) {
                appendElement(arrayStack.data[i]);
            }
        }
    } else {
        arrayStack.data.forEach(element => {
            if (element !== undefined) {
                appendElement(element);
            }
        });
    }
}

// Toggle layout event listener
document.getElementById('toggle-layout-btn').addEventListener('click', () => {
    arrayDisplay.classList.toggle('vertical-layout');
    displayArray(); // Update display on toggle
});

document.getElementById('clear-array-btn').addEventListener('click', () => {
    
    arrayStack.clear();
    updateDisplay();
    //toggleSidebar(false); // Revert sidebar when array is cleared
});


updateDisplay()