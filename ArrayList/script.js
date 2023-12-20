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
    const indexToAdd = parseInt(indexInput.value, 10);
    arrayList.addAt(indexToAdd, elementInput.value);
    updateDisplay();
});

document.getElementById('remove-btn').addEventListener('click', () => {
    arrayList.remove();
    updateDisplay();
});


document.getElementById('remove-at-btn').addEventListener('click', () => {
    const indexToRemove = parseInt(indexInput.value, 10);
    arrayList.removeAt(indexToRemove);
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
    attachEventListeners();

 }
 function displayArray() {
    const arrayTitle = document.getElementById('array-list-title');
    arrayTitle.innerHTML = ''; // Clear existing title

    const heading = document.createElement('h2');
    heading.textContent = 'ArrayList Visualization';
    arrayTitle.appendChild(heading);

    const arrayDisplay = document.getElementById('array-display');
    arrayDisplay.innerHTML = ''; // Clear existing content

    arrayList.data.forEach((element, index) => {
        // Skip undefined elements
        if (element !== undefined) {
            const elementContainer = document.createElement('div');
            elementContainer.className = 'array-element';
            elementContainer.textContent = `${element}`;

            const color = arrayList.colors[index];
            if (color) {
                elementContainer.style.backgroundColor = color;
            }

        arrayDisplay.appendChild(elementContainer);

        }
    });

    

}

document.getElementById('clear-array-btn').addEventListener('click', () => {
    
    arrayList.clear();

    // Update display
    updateDisplay();
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

function attachEventListeners() {
    //called very element update to add event listeners to new dynamicly added elements
    document.querySelectorAll('.array-element').forEach(element => {
        element.addEventListener('mouseenter', playRandomSound);
    });
}


document.querySelectorAll('.array-element').forEach(element => {
    element.addEventListener('click', playRandomSound);
});

function playRandomSound() {
    // Array of sound elements
    const sounds = [
        document.getElementById('sound1')
        // Add more sound elements if needed
    ];

    sounds.forEach(sound => {
        sound.volume = 0.3; 
    });


    // Select a random sound
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

    // Play the selected sound
    randomSound.play();
}

let isSoundEnabled = true; // Default state of the sound

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('toggle-sound-btn').addEventListener('click', toggleSound);
});

function toggleSound() {
    isSoundEnabled = !isSoundEnabled; // Toggle the sound state
    updateSoundState();
}

function updateSoundState() {
    const soundButtonText = isSoundEnabled ? '🔇' : '🔊';
    document.getElementById('toggle-sound-btn').textContent = soundButtonText;

    const soundIDs = ['sound1',];
    soundIDs.forEach(soundID => {
        const soundElement = document.getElementById(soundID);
        if (soundElement) {
            soundElement.muted = !isSoundEnabled; // Mute or unmute if the element exists
        } else {
            console.error(`Audio element with ID '${soundID}' not found.`);
        }
    });
}


// Ensure the initial state is applied
updateSoundState();
