

const arrayList = new ArrayList();
const elementInput = document.getElementById('element-input');
const indexInput = document.getElementById('index-input');
const arrayDisplay = document.getElementById('array-display');

document.getElementById('add-btn').addEventListener('click', () => {
    arrayList.add(elementInput.value);
    updateDisplay();
});

document.getElementById('add-at-btn').addEventListener('click', () => {
    arrayList.addAt(parseInt(indexInput.value, 10), elementInput.value);
    updateDisplay();
});

document.getElementById('remove-btn').addEventListener('click', () => {
    arrayList.remove();
    updateDisplay();
});


document.getElementById('remove-at-btn').addEventListener('click', () => {
    const indexToRemove = parseInt(indexInput.value, 10);
    if (indexToRemove >= 0 && indexToRemove < arrayList.data.length) {
        // Immediately remove the element from the array
        arrayList.removeAt(indexToRemove);
        // Temporarily update display to show an empty space
        const elements = document.querySelectorAll('.array-element');
        if (elements[indexToRemove]) {
            elements[indexToRemove].textContent = ''; // Clear the text content
            elements[indexToRemove].classList.add('array-element-empty');
        }
 
 
        // Delay the visual update of the array display
        setTimeout(updateDisplay, 1000); // Delay of 1 second
    }
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
});

function updateDisplay() {
    arrayDisplay.textContent = 'ArrayList: [' + arrayList.data.join(', ') + ']';
    displayArray();
 }
 function displayArray() {
    console.log(arrayList);
    const arrayTitle = document.getElementById('array-list-title');
    arrayTitle.innerHTML = ''; // Clear existing title

    const heading = document.createElement('h2');
    heading.textContent = 'ArrayList';
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

updateDisplay();

 

updateDisplay();
