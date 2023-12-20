

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
    arrayList.removeAt(elementInput.value);
    updateDisplay();
});

document.getElementById('set-btn').addEventListener('click', () => {
    arrayList.set(elementInput.value, parseInt(indexInput.value, 10));
    updateDisplay();
});

function updateDisplay() {
    arrayDisplay.textContent = 'ArrayList: [' + arrayList.data.join(', ') + ']';
}

updateDisplay();
