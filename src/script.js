document.addEventListener('DOMContentLoaded', () => {
    const elementDisplay = document.getElementById('element-display');
    const typeToggleButtons = document.querySelectorAll('.type-toggles .toggle-btn');
    const shuffleToggleButton = document.getElementById('shuffle-toggle');
    const resetButton = document.getElementById('reset-button');
    const starIcon = document.querySelector('.star-icon');
    const starredToggleButton = document.getElementById('starred-toggle');
    const playIcon = document.querySelector('.play-icon');
    let currentAudio = null;
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
            'zip',
            'best',
            'clip',
            'dent', 'dock', 'drag', 'duck', 'dust',
            'fist', 'flop', 'from',
            'grab', 'grin',
            'hand', 'hint', 'hump',
            'jump',
            'lamp', 'lock', 'luck',
            'mist', 'must',
            'nest',
            'pick', 'plot', 'pond', 'puck',
            'rent', 'rock',
            'sink', 'slim', 'slog', 'snip', 'sock', 'spin', 'spot', 'stun',
            'tack', 'tent', 'trap', 'trip',
            'yell',
        ],
        sentences: [
            'The cat sat on the mat.',
            'The dog is big.',
            'The sun is hot.',
            'A bug is on a log.',
            'The pig is in the pen.',
            'The cat is on the bed.',
            'The man has a red cap.',
            'I can run to the van.',
            'A wet hen is in the pen.',
            'I can jump on the bed.',
            'The duck is in the pond.',
            'I have a red sock.',
            'The man has a big hand.',
            'I can sit on the rock.',
            'The cat has a wig.',
            'A man can grab a log.',
            'I can spin on the spot.',
            'The duck has a nest.',
            'I can pick a red top.'
        ],
        numbers11to19: Array.from({ length: 9 }, (_, i) => (11 + i).toString()),
        numbers10to90: Array.from({ length: 9 }, (_, i) => ((i + 1) * 10).toString())
    };
    let currentElements = [];
    let currentIndex = 0;
    let activeTypes = ['letters']; // Default to letters
    let isShuffled = false;
    let starredElements = JSON.parse(localStorage.getItem('starredElements')) || [];
    let showStarredOnly = false;


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

        if (showStarredOnly) {
            currentElements = starredElements.filter(element => {
                return activeTypes.some(type => allData[type]?.includes(element));
            });
        }

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

    function handleStarredToggle(event) {
        const button = event.target;
        showStarredOnly = button.classList.contains('active');
        updateElementList();
    }

    function adjustFontSize(element, container) {
        // Reset font size to the default from CSS to get a starting point
        element.style.fontSize = '';
        
        // Use the computed style as the base for scaling
        const baseFontSize = parseFloat(window.getComputedStyle(element, null).getPropertyValue('font-size'));

        // Set a max font size based on container height to avoid vertical overflow
        const containerHeight = container.clientHeight;
        const maxFontSize = (containerHeight - 80) * 0.5; // Subtract padding (40px*2) and use 90% of available height

        let finalFontSize = Math.min(baseFontSize, maxFontSize);
        element.style.fontSize = finalFontSize + 'px';

        // Now, check for width overflow and shrink if necessary
        const containerWidth = container.clientWidth - 40; // padding is 20px on each side
        
        while (element.scrollWidth > containerWidth && finalFontSize > 10) {
            finalFontSize -= 1;
            element.style.fontSize = finalFontSize + 'px';
        }

        // Further reduce font size for sentences
        if (element.textContent.length > 15) { // Assuming sentences are longer than 15 chars
            finalFontSize *= 0.75; // Reduce by 25%
            element.style.fontSize = finalFontSize + 'px';
        }
    }

    function displayCurrentElement() {
        const elementContent = document.getElementById('element-content');
        if (currentElements.length === 0) {
            elementContent.textContent = "-";
            starIcon.classList.remove('active');
            starIcon.style.opacity = '0.5';
            elementContent.style.fontSize = ''; // Reset font size
            return;
        }
        if (currentIndex >= 0 && currentIndex < currentElements.length) {
            const currentElement = currentElements[currentIndex];
            elementContent.textContent = currentElement;

            adjustFontSize(elementContent, elementDisplay);

            // Update star icon state
            starIcon.style.opacity = '1';
            if (starredElements.includes(currentElement)) {
                starIcon.classList.add('active');
            } else {
                starIcon.classList.remove('active');
            }
        } else {
            elementContent.textContent = "-"; // Should not happen if logic is correct
        }
    }

    function toggleStarredElement() {
        if (currentElements.length === 0) return;

        const currentElement = currentElements[currentIndex];
        const index = starredElements.indexOf(currentElement);

        if (index === -1) {
            starredElements.push(currentElement);
        } else {
            starredElements.splice(index, 1);
        }

        localStorage.setItem('starredElements', JSON.stringify(starredElements));
        displayCurrentElement();
    }

    // --- Event Handlers ---
    function handlePreviousElement() {
        if (currentElements.length === 0) return;

        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = currentElements.length - 1; // Loop to the end
        }
        displayCurrentElement();
    }

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
    let touchStartX = 0;
    let touchEndX = 0;
    const SWIPE_THRESHOLD = 50; // Minimum distance in pixels to consider it a swipe

    elementDisplay.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        elementDisplay.classList.add('swiping');
    });

    elementDisplay.addEventListener('touchmove', (e) => {
        const currentX = e.changedTouches[0].screenX;
        const diff = currentX - touchStartX;
        // Add visual feedback during swipe
        elementDisplay.style.transform = `translateX(${diff * 0.3}px)`;
    });

    elementDisplay.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        elementDisplay.classList.remove('swiping');
        elementDisplay.style.transform = '';

        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > SWIPE_THRESHOLD) {
            if (diff > 0) {
                handlePreviousElement(); // Swipe right
            } else {
                handleNextElement(); // Swipe left
            }
        }
    });

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
    starIcon.addEventListener('click', toggleStarredElement);
    starredToggleButton.addEventListener('click', handleStarredToggle);

    // Initial population
    updateElementList();

    // Audio playback functionality
    playIcon.addEventListener('click', () => {
        if (currentElements.length === 0) return;

        const currentElement = currentElements[currentIndex];

        // Stop any currently playing audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }

        try {
            const audioPath = `./assets/sounds/sound_${currentElement.toLowerCase()}.mp3`;
            currentAudio = new Audio(audioPath);
            currentAudio.addEventListener('error', () => {
                console.error('Audio load failed:', {
                    element: currentElement,
                    path: audioPath
                });
                alert(`Sound file for ${currentElement} not found.`);
                currentAudio = null;
            });

            currentAudio.play().catch(error => {
                console.error('Audio playback failed:', {
                    error: error.message,
                    element: currentElement,
                    path: audioPath
                });
                alert(`Could not play sound for ${currentElement}. Please try again.`);
                currentAudio = null;
            });

            // Visual feedback
            playIcon.classList.add('active');
            setTimeout(() => playIcon.classList.remove('active'), 300);
        } catch (error) {
            console.error('Error loading audio:', {
                error: error.message,
                element: currentElement
            });
            alert(`Error loading sound for ${currentElement}. Please try again.`);
            currentAudio = null;
        }
    });
});
