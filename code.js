let usernameList = loadUsernames(); // Load usernames from Local Storage

function addUsernames() {
    let input = document.getElementById("usernameInput").value;
    let usernames = input.split("\n");
    let addedCount = 0;

    usernames.forEach(username => {
        let trimmedUsername = username.trim();
        if (trimmedUsername !== "") {
            usernameList.push(trimmedUsername);
            addedCount++;
        }
    });

    saveUsernames(); // Save usernames to Local Storage
    displayUsernames();
    showConfirmation(`Added ${addedCount} usernames successfully.`);
}

function showUsernames() {
    let usernameListContainer = document.getElementById("usernameList");
    usernameListContainer.innerHTML = "";

    if (usernameList.length === 0) {
        document.getElementById("totalDisplay").innerText = "Total: 0";
    } else {
        document.getElementById("totalDisplay").innerText = `Total: ${usernameList.length}`;
        usernameList.forEach((username, index) => {
            let listItem = document.createElement("div");
            listItem.innerHTML = `<span>${index + 1}. ${username}</span>`;
            usernameListContainer.appendChild(listItem);
        });
    }
}

function showAllUsernames() {
    let allUsernames = usernameList.join("\n");
    document.getElementById("showAllContainer").innerHTML = `<p>All Usernames:</p><pre>${allUsernames}</pre>`;
}

function removeUsernames() {
    let input = document.getElementById("removeInput").value;
    let usernamesToRemove = input.split(",");
    let removedCount = 0;

    usernamesToRemove.forEach(username => {
        let trimmedUsername = username.trim();
        if (trimmedUsername !== "") {
            let index = usernameList.indexOf(trimmedUsername);
            if (index !== -1) {
                usernameList.splice(index, 1);
                removedCount++;
            }
        }
    });

    saveUsernames(); // Save usernames to Local Storage
    displayUsernames();
    showConfirmation(`Removed ${removedCount} usernames successfully.`);
}

function showConfirmation(message) {
    let confirmationText = document.getElementById("confirmationText");
    confirmationText.innerText = message;
    setTimeout(() => {
        confirmationText.innerText = "";
    }, 3000);
}

function displayUsernames() {
    showUsernames();
}

function saveUsernames() {
    localStorage.setItem("usernames", JSON.stringify(usernameList));
}

function loadUsernames() {
    let storedUsernames = localStorage.getItem("usernames");
    return storedUsernames ? JSON.parse(storedUsernames) : [];
}

// Load usernames when the page loads
window.onload = displayUsernames;
// ... (previous code)



// ... (previous code)

// ... (previous code)

function copyAllUsernames() {
    usernameList.forEach((username, index) => {
        setTimeout(() => {
            copyToClipboard(username);
            if (index === usernameList.length - 1) {
                showConfirmation("All usernames copied to clipboard!");
            }
        }, index * 1000); // Adjust the delay if needed
    });
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Unable to copy text to clipboard', err);
    }
}






