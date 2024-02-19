function selectPower(power) {
    if (power === 'Code') {
        // Ask for the password
        var password = prompt('Enter the password:');
        
        // Check if the entered password is correct
        if (password === 'bossmakethis') {
            window.location.href = 'code.html'; // Redirect to code.html
        } else {
            alert('Incorrect password. Access denied.');
        }
    } else if (power === 'join') {
        window.location.href = 'join.html'; // Redirect to join.html
    } else {
        // Handle other powers as needed
        alert('You selected: ' + power);
    }
}
