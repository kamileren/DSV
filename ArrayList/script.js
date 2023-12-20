const arrayList = new ArrayList();
const elementInput = document.getElementById('element-input');
const indexInput = document.getElementById('index-input');
const arrayDisplay = document.getElementById('array-display');
const sidebar = document.getElementById('sidebar');
    

document.getElementById('add-btn').addEventListener('click', () => {
    arrayList.add(elementInput.value);
    updateDisplay();
});

document.getElementById('add-at-btn').addEventListener('click', () => {
    arrayList.addAt(parseInt(indexInput.value, 10), elementInput.value);
    const elements = document.querySelectorAll('.array-element');
    updateDisplay();
});

document.getElementById('remove-btn').addEventListener('click', () => {
    arrayList.remove();
    updateDisplay();
});


document.getElementById('remove-at-btn').addEventListener('click', () => {
    const indexToRemove = parseInt(indexInput.value, 10);
    arrayList.removeAt(indexToRemove);
    updateDisplay();

 });
 

document.getElementById('set-btn').addEventListener('click', () => {
    arrayList.set(elementInput.value, parseInt(indexInput.value, 10));
    updateDisplay();
});

document.getElementById('make-array-btn').addEventListener('click', () => {

    for (let i = 0; i < 10; i++) {
        arrayList.add(i);
    }
    updateDisplay();
    toggleSidebar(true); // Toggle sidebar when array is created
});

function updateDisplay() {
    console.log(arrayList)
    arrayDisplay.textContent = 'ArrayList: [' + arrayList.data.join(', ') + ']';
    displayArray();
 }
 function displayArray() {
    const arrayTitle = document.getElementById('array-list-title');
    arrayTitle.innerHTML = ''; // Clear existing title

    const heading = document.createElement('h2');
    heading.textContent = 'ArrayList Visualization';
    arrayTitle.appendChild(heading);

    const arrayDisplay = document.getElementById('array-display');
    arrayDisplay.innerHTML = ''; // Clear existing content

    arrayList.data.forEach((element) => {
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
    
    arrayList.clear();

    // Update display
    updateDisplay();
    toggleSidebar(false); // Revert sidebar when array is cleared
});
document.getElementById('contains-btn').addEventListener('click', () => {
    const elementToCheck = elementInput.value;

    if (arrayList.contains(elementToCheck)) {
        arrayDisplay.style.backgroundColor = 'red';
    } else {
        arrayDisplay.style.backgroundColor = 'initial';
    }
});

function toggleSidebar(isArrayCreated) {
    if (isArrayCreated) {
        sidebar.classList.add('sidebar-reduced');
        document.querySelectorAll('.hide-on-array-create').forEach(button => button.style.display = 'none');
    } else {
        sidebar.classList.remove('sidebar-reduced');
        document.querySelectorAll('.hide-on-array-create').forEach(button => button.style.display = 'block');
    }
}

updateDisplay()