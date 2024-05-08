const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
let hoverCount = 0;
let moveYesButton = false;
let speedXYesButton = 0.01;
let speedYYesButton = 0.01;


noButton.addEventListener('mouseover', () => {
    // Increase the size of the "Yes" button every time you hover over the "No" button
    yesButton.style.transform += `scale(1.075)`;

    // Decrease the size of the "No" button every time you hover over the "No" button
    noButton.style.transform += `scale(0.9775)`;

    speedYYesButton = speedYYesButton * 1.1
    speedXYesButton = speedXYesButton * 1.1

});

noButton.addEventListener('mouseover', () => {


    if (hoverCount >= 5) {
        yesButton.style.color = 'red';
    }

    if (hoverCount >= 6) {
        // Add a new button
        let newButton = document.createElement("button");
        newButton.innerHTML = "YES";
        newButton.className = "new-button";
        document.body.appendChild(newButton);

        // Set initial position
        const maxX = window.innerWidth - newButton.offsetWidth;
        const maxY = window.innerHeight - newButton.offsetHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        newButton.style.position = "absolute";
        newButton.style.left = `${randomX}px`;
        newButton.style.top = `${randomY}px`;

        // Set background and text color
        newButton.style.backgroundColor = 'green';
        newButton.style.color = 'red';

        newButton.addEventListener('click', () => {
            window.location.href = 'yes.html'; // Change the URL to the desired page
        });

        // Function to handle movement
        function moveButton(newButton) {
            const buttonWidth = newButton.offsetWidth;
            const buttonHeight = newButton.offsetHeight;
            let speedX = Math.random() * 6 - 2;
            let speedY = Math.random() * 6 - 2;
            setInterval(() => {
                let newX = parseFloat(newButton.style.left) + speedX;
                let newY = parseFloat(newButton.style.top) + speedY;
                if (newX < 0 || newX > maxX - buttonWidth) {
                    speedX = -speedX;
                }
                if (newY < 0 || newY > maxY - buttonHeight) {
                    speedY = -speedY;
                }
                newButton.style.left = `${newX}px`;
                newButton.style.top = `${newY}px`;
            }, 50);
        }


        // Move button
        moveButton(newButton);
    }
});

noButton.addEventListener('mouseover', () => {
    hoverCount++;

    if (hoverCount >= 3) {
        moveYesButton = true;
    }

    // Get the width and height of the button
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    // Calculate a random position within the window
    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Move the button to the random position
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
});

document.addEventListener('mousemove', (event) => {
    if (moveYesButton) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const buttonWidth = yesButton.offsetWidth;
        const buttonHeight = yesButton.offsetHeight;

        const newX = mouseX - buttonWidth / 2;
        const newY = mouseY - buttonHeight / 2;

        const currentX = parseFloat(yesButton.style.left) || 0;
        const currentY = parseFloat(yesButton.style.top) || 0;

        const deltaX = newX - currentX;
        const deltaY = newY - currentY;

        yesButton.style.left = `${currentX + deltaX * speedXYesButton}px`;
        yesButton.style.top = `${currentY + deltaY * speedYYesButton}px`;
    }
});
