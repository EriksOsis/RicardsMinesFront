document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');

    // SVG for green diamond
    const greenDiamondSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.61 70"><defs><style>.cls-1{fill:#051d27;}.cls-2{fill:#06e403;}.cls-3{fill:#05a902;}.cls-4{fill:#01e501;}.cls-5{fill:#00d503;}.cls-6{fill:#09fd02;}.cls-7{fill:#019902;}.cls-8{fill:#01e300;}.cls-9{fill:#57fd7f;}.cls-10{fill:#03be02;}</style></defs><title>3Artboard 710</title><g id="Layer_1" data-name="Layer 1"><path class="cls-1" d="M38,70h0a2.75,2.75,0,0,1-2-.92L.7,29.62a2.76,2.76,0,0,1-.31-3.25L11,8.55a2.76,2.76,0,0,1,1.27-1.12L23.12,2.71a2.77,2.77,0,0,1,.62-.19L37.74,0a3.09,3.09,0,0,1,1,0L52.62,2.52a3.38,3.38,0,0,1,.62.18L64.42,7.58l.13,0h0a2.69,2.69,0,0,1,.65.45h0a3,3,0,0,1,.4.47h0l.09.14L76.23,26.6a2.73,2.73,0,0,1-.34,3.25L40.06,69.1A2.76,2.76,0,0,1,38,70Z"/><path class="cls-2" d="M22.13,18.75c-2.64,7-1.74,13.65,2.09,20,6.74-3.1,11.83-8.4,14.44-17C33,18.93,27.49,17.74,22.13,18.75Z"/><path class="cls-3" d="M73.86,28,63.33,10.1c-6.26,1.19-8.79,4.41-9,8.91C58.67,25.3,65.39,28,73.86,28Z"/><path class="cls-4" d="M38.49,21.94c.15,7.77,4.2,13.31,12.19,16.57l.07,0c4.5-5.59,5.9-12,3.62-19.47C48.26,16.08,42.9,16.72,38.49,21.94Z"/><path class="cls-5" d="M24.22,38.76q13.19,6.43,26.46-.25L38.49,21.94Z"/><path class="cls-6" d="M24.22,38.76c1,9.17,6.29,18.72,13.81,28.49,7.4-9,12.5-18.4,12.72-28.77Z"/><path class="cls-7" d="M50.75,38.48,38,67.25,73.86,28C64.47,28.32,56.19,30.75,50.75,38.48Z"/><path class="cls-8" d="M2.75,27.79,38,67.25,24.22,38.76C20.11,31,11.89,28.8,2.75,27.79Z"/><path class="cls-9" d="M13.39,10,2.75,27.79c9.33,1.22,16.19-1.21,19.54-8.88C24.57,13.79,21.22,11,13.39,10Z"/><polygon class="cls-6" points="2.75 27.79 24.22 38.76 22.29 18.91 2.75 27.79"/><polygon class="cls-6" points="52.14 5.23 38.22 2.75 24.22 5.23 13.39 9.96 22.29 18.91 38.49 21.94 54.37 19.01 63.33 10.1 52.14 5.23"/><polygon class="cls-10" points="50.74 38.48 73.86 27.99 54.37 19.01 50.74 38.48"/><polygon class="cls-9" points="13.89 10.83 24.37 5.43 38.22 2.75 24.22 5.23 13.39 9.96 13.89 10.83"/><polygon class="cls-9" points="22.29 18.91 24.22 38.76 21.1 19.05 22.29 18.91"/><polygon class="cls-9" points="22.29 18.91 38.49 21.94 38.03 22.48 22.29 18.91"/><polygon class="cls-9" points="63.33 10.1 53 19.28 54.37 19.01 63.33 10.1"/></g></svg>
`;

    // Function to initialize the grid
    function initializeGrid() {
        gridContainer.innerHTML = ''; // Clear the grid container
        for (let i = 0; i < 25; i++) {
            const tile = document.createElement('div');
            tile.classList.add('grid-tile');
            gridContainer.appendChild(tile);
        }
    }

    // Function to reveal tile
    function revealTile(tile) {
        tile.classList.add('revealed'); // Start the tile animation
        setTimeout(() => {
            tile.classList.add('revealed-tile'); // Add the green diamond after the animation
            tile.innerHTML = greenDiamondSVG;
        }, 400); // Sync this with the tile animation timing
    }

    // Initialize the grid on page load
    initializeGrid();

    // Trap selection controls
    const trapNumberDisplay = document.querySelector('.trap-number');
    const leftButton = document.querySelector('.left');
    const rightButton = document.querySelector('.right');

    let trapIndex = 0;

    // Available mines: 1, 3, 5, 7, 9, 11, 13, 15
    const availableTraps = [1, 3, 5, 7, 9, 11, 13, 15];

    // Corresponding number of tiles to reveal
    const tilesToRevealMapping = {
        1: 10,
        3: 9,
        5: 8,
        7: 7,
        9: 6,
        11: 3,
        13: 3,
        15: 3,
    };

    leftButton.addEventListener('click', () => {
        if (trapIndex > 0) {
            trapIndex--;
            updateTrapDisplay();
        }
    });

    rightButton.addEventListener('click', () => {
        if (trapIndex < availableTraps.length - 1) {
            trapIndex++;
            updateTrapDisplay();
        }
    });

    function updateTrapDisplay() {
        trapNumberDisplay.textContent = availableTraps[trapIndex];
        leftButton.disabled = trapIndex === 0;
        rightButton.disabled = trapIndex === availableTraps.length - 1;
    }

    // Initialize display with default trap number
    updateTrapDisplay();

    // Play button functionality
    const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', () => {
        resetGrid();  // Reset the grid every time the play button is pressed
        setTimeout(revealRandomTiles, 500); // Add a delay before revealing tiles
    });

    // New game button functionality
    const newGameButton = document.getElementById('play-button');
    newGameButton.addEventListener('click', resetGrid);

    // Function to reset the grid
    function resetGrid() {
        initializeGrid();  // Clear the grid and reinitialize
    }

    // Function to randomly reveal tiles based on the selected number of mines
    function revealRandomTiles() {
        const mines = availableTraps[trapIndex];
        const tilesToReveal = tilesToRevealMapping[mines]; // Get the number of tiles to reveal

        const tiles = Array.from(document.querySelectorAll('.grid-tile'));
        const shuffledTiles = tiles.sort(() => 0.5 - Math.random());
        const selectedTiles = shuffledTiles.slice(0, tilesToReveal);

        selectedTiles.forEach((tile, index) => {
            setTimeout(() => revealTile(tile), index * 300); // 300ms delay between each reveal
        });
    }

    // Modal handling
    const modal = document.getElementById('userModal');
    const modalContent = document.querySelector('.modal-content');
    const submitButton = document.querySelector('.modal-submit');
    const errorMessage = document.querySelector('.modal-error');
    const inputField = document.getElementById('userIdInput');

    // Prevent clicks inside modal content from bubbling up
    modalContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Unfocus input when clicking outside modal content
    modal.addEventListener('click', function(event) {
        inputField.blur();
        closeKeyboardOnMobile();
    });

    submitButton.addEventListener('click', submitUserId);

    function showModal() {
        modal.classList.remove('hide');
        modalContent.classList.add('show');
    }

    function hideModal() {
        modalContent.classList.remove('show');
        modal.classList.add('hide');

        // Hide the modal completely after the fade-out animation ends
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    async function submitUserId() {
        const userId = document.getElementById('userIdInput').value.trim();
        if (!userId) {
            showErrorMessage('Please enter activation password');
        } else if (userId === "Z52gwqBHZkD8L2b") {
            hideErrorMessage();
            hideModal();
        } else {
            showErrorMessage('Wrong activation password');
        }
    }

    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideErrorMessage() {
        errorMessage.style.display = 'none';
    }

    // Show the modal on page load
    showModal();
});