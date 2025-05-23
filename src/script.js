document.addEventListener('DOMContentLoaded', () => {
    const elementDisplay = document.getElementById('element-display');
    const typeToggleButtons = document.querySelectorAll('.type-toggles .toggle-btn');
    const shuffleToggleButton = document.getElementById('shuffle-toggle');
    const resetButton = document.getElementById('reset-button');

    const allData = {
        letters: Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // a-z
        capitals: Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A-Z
        combos: ['sh', 'ch', 'th', 'ph'],
        cvc: [
            'bag', 'bat', 'bed', 'big', 'bud', 'bug',
            'can', 'cap', 'cat', 'cob', 'cup',
            'dad', 'dip', 'dog',
            'fan', 'fin', 'fog', 'fun',
            'hat', 'hen', 'hop', 'hot',
            'log',
            'man', 'map', 'mom', 'mop', 'mug',
            'nut',
            'pen', 'pig', 'pod',
            'red', 'run',
            'sip', 'sit', 'sun',
            'tan', 'top',
            'van',
            'wet', 'wig',
            'zip'
        ],
        numbers11to19: Array.from({ length: 9 }, (_, i) => (11 + i).toString()),
        numbers10to90: Array.from({ length: 9 }, (_, i) => ((i + 1) * 10).toString())
    };

    let currentElements = [];
    let currentIndex = 0;
    let activeTypes = ['letters']; // Default to letters
    let isShuffled = false;

    // --- Helper Functions ---
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function updateElementList() {
        currentElements = [];
        activeTypes.forEach(type => {
            if (allData[type]) {
                currentElements.push(...allData[type]);
            }
        });

        if (currentElements.length === 0) {
            displayCurrentElement(); // Will show "-"
            return;
        }

        if (isShuffled) {
            shuffleArray(currentElements);
        } else {
            // Sort alphabetically, ensuring consistent order for mixed types
            currentElements.sort((a, b) => a.localeCompare(b));
        }
        currentIndex = 0;
        displayCurrentElement();
    }

    function displayCurrentElement() {
        if (currentElements.length === 0) {
            elementDisplay.textContent = "-";
            return;
        }
        if (currentIndex >= 0 && currentIndex < currentElements.length) {
            elementDisplay.textContent = currentElements[currentIndex];
        } else {
            elementDisplay.textContent = "-"; // Should not happen if logic is correct
        }
    }

    // --- Event Handlers ---
    function handleNextElement() {
        if (currentElements.length === 0) return;

        currentIndex++;
        if (currentIndex >= currentElements.length) {
            currentIndex = 0; // Loop back to the start
        }
        displayCurrentElement();
    }

    function handleTypeToggle(event) {
        const button = event.target;
        const type = button.dataset.type;

        button.classList.toggle('active');

        if (button.classList.contains('active')) {
            if (!activeTypes.includes(type)) {
                activeTypes.push(type);
            }
        } else {
            activeTypes = activeTypes.filter(t => t !== type);
        }
        updateElementList();
    }

    function handleShuffleToggle() {
        isShuffled = !isShuffled;
        updateElementList();
    }

    function handleReset() {
        currentIndex = 0;
        displayCurrentElement();
    }

    // --- Initialize ---
    elementDisplay.addEventListener('click', handleNextElement);
    // Also allow Enter key if element is focused (for accessibility/desktop)
    elementDisplay.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleNextElement();
            event.preventDefault(); // Prevent space from scrolling
        }
    });


    typeToggleButtons.forEach(button => {
        button.addEventListener('click', handleTypeToggle);
        // Set initial active state based on default activeTypes
        if (activeTypes.includes(button.dataset.type)) {
            button.classList.add('active');
        }
    });

    shuffleToggleButton.addEventListener('click', handleShuffleToggle);
    resetButton.addEventListener('click', handleReset);

    // Initial population
    updateElementList();
});
