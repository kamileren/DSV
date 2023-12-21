const arrayList = new ArrayList();
const elementInput = document.getElementById('element-input');
const indexInput = document.getElementById('index-input');
const arrayDisplay = document.getElementById('array-display');
const sidebar = document.getElementById('sidebar');
    

document.getElementById('add-btn').addEventListener('click', () => {
    arrayList.add(elementInput.value);
    updateDisplay();
});



document.getElementById('remove-btn').addEventListener('click', () => {
    arrayList.remove();
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
    document.querySelectorAll('.array-element').forEach(element => {
        element.addEventListener('mouseenter', playRandomSound);

        element.addEventListener('click', () => {
            event.stopPropagation();  // Prevent click from propagating to the document

            console.log("Element clicked"); // Console log for debugging
            showPopup(element, "");
        });

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


function showPopup(element, additionalContent) {
    let popup = document.getElementById("popup");
    if (!popup) {
        popup = document.createElement("div");
        popup.id = "popup";
        popup.className = "popup";
        document.body.appendChild(popup);
    }

    // Calculate the index (nth child) of the element
    const index = Array.from(element.parentNode.children).indexOf(element);
    const content = `<strong>Index: </strong> ${index}<br/>${additionalContent}`;
    const inputForAddSet = document.createElement('input');
    
    inputForAddSet.type = 'text';
    inputForAddSet.placeholder = 'Enter value';
    inputForAddSet.className = 'popup-input'; // Add a class for styling

    

   


    popup.innerHTML = content;
    const rect = element.getBoundingClientRect();
    popup.style.left = `${rect.right + 10}px`;
    popup.style.top = `${rect.top}px`;
    popup.style.display = "block";
    popup.innerHTML = `<strong>Index: </strong> ${index}<br/>${additionalContent}`;


    

    // Append input field to the popup

    
    // Create buttons and set their actions
    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.onclick = () => {
        arrayList.addAt(index, inputForAddSet.value);
        updateDisplay();
        hidePopup();
    };

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => arrayList.removeAt(index);

    const setButton = document.createElement('button');
    setButton.textContent = 'Set';
    setButton.onclick = () => {
        arrayList.set(inputForAddSet.value,index);
        updateDisplay();
        hidePopup();
    };
    

    // Append buttons to the content
    popup.innerHTML = `<strong>Index: </strong> ${index}<br/>${additionalContent}`;
    popup.appendChild(addButton);
    popup.appendChild(removeButton);
    popup.appendChild(setButton);
    popup.appendChild(inputForAddSet);

}

document.addEventListener('click', (event) => {
    console.log("Document clicked"); // Debugging log
    const popup = document.getElementById('popup');
    if (popup && !popup.contains(event.target)) {
        console.log("Hiding popup"); // Debugging log
        hidePopup();
    }
});

function hidePopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "none";
    }
}


updateDisplay();
updateSoundState();
