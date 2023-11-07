(function () {
    const wheel = document.querySelector('.main__spinner')
    const startButton = document.querySelector('.run-circle')

    const modal = document.querySelector('.prize')


    let deg = 0;
    let spins = 1;
    let zoneSize = 36; // deg

    // Counter clockwise
    const symbolSegments = {
        0: "100FS",
        1: "Bonus 50€",
        2: "Bonification +150%",
        3: "Bonus 50€",
        4: "100FS",
        5: "Bonus 100€",

        6: "50FS",
        7: "Bonus 100€",
        8: "Bonification +150%",
        9: "Bonus 100€",
    }




    const showModal = () => {
        // modalForm.classList.add('show')
        modal.style.display = 'flex';
    }

    const handleWin = (actualDeg) => {
        let winningSymbolNr = Math.ceil(actualDeg / zoneSize) % 9;
        console.log(symbolSegments[winningSymbolNr]);
        console.log(winningSymbolNr);

        spins--;
        if (winningSymbolNr == 0) winningSymbolNr = 10;

        setTimeout(showModal, 300)

    }

    const spin = () => {
        // Disable button during spin
        startButton.style.pointerEvents = 'none';

        // Calculate a new rotation between 5000 and 10 000
        // deg = (36 * Math.floor(5 * Math.random())) + 3600;
        // deg = Math.floor(5000 + Math.random() * 5000);
        deg = 36 * Math.floor(4 * Math.random()) * 2 + 3600;
        // deg = 36 * 10;

        // Set the transition on the wheel
        wheel.style.transition = 'all 5s ease-out';

        // Rotate the wheel
        wheel.style.transform = `rotate(${deg}deg)`;

        // Apply the blur
        wheel.classList.add('blur');
    }

    const wheelToUsual = () => {
        // Remove blur
        wheel.classList.remove('blur');
        // Enable button when spin is over
        startButton.style.pointerEvents = 'auto';
        // Need to set transition to none as we want to rotate instantly
        wheel.style.transition = 'none';
        // Calculate degree on a 360 degree basis to get the "natural" real rotation
        // Important because we want to start the next spin from that one
        // Use modulus to get the rest value
        const actualDeg = deg % 360;
        // Set the real rotation instantly without animation
        wheel.style.transform = `rotate(${actualDeg}deg)`;
        // Calculate and display the winning symbol
        handleWin(actualDeg);
    }

    startButton.addEventListener('click', spin);

    wheel.addEventListener('transitionend', wheelToUsual);
})();
