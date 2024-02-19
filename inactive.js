var attendanceSheet = JSON.parse(localStorage.getItem('attendanceSheet')) || []; // Retrieve attendance data from localStorage

updateAttendanceSheet(); // Update attendance sheet when page loads

document.getElementById("usernameInput").addEventListener("input", function() {
    var input = this.value.trim();
    var suggestions = document.getElementById("suggestions");
    if (input === "") {
        suggestions.innerHTML = "";
        return;
    }
    var filteredUsernames = attendanceSheet.filter(function(item) {
        return item.username.toLowerCase().includes(input.toLowerCase());
    });
    var suggestionList = filteredUsernames.map(function(item) {
        return `<div class="suggestion" onclick="markAttendance('${item.username}')">${item.username}</div>`;
    }).join("");
    suggestions.innerHTML = suggestionList;
});

document.getElementById("searchInput").addEventListener("input", function() {
    var input = this.value.trim();
    var suggestions = document.getElementById("suggestions");
    if (input === "") {
        suggestions.innerHTML = "";
        return;
    }
    var filteredUsernames = attendanceSheet.filter(function(item) {
        return item.username.toLowerCase().includes(input.toLowerCase());
    });
    var suggestionList = filteredUsernames.map(function(item) {
        return `<div class="suggestion" onclick="markAttendance('${item.username}')">${item.username}</div>`;
    }).join("");
    suggestions.innerHTML = suggestionList;
});

function sortUsernames() {
    var input = document.getElementById("usernameInput").value;
    var usernames = input.split("@").map(function(item) {
        return item.trim();
    });
    usernames = usernames.filter(function(item) {
        return item !== ""; // Remove empty strings
    });
    usernames.sort();
    updateAttendance(usernames);
    updateAttendanceSheet();
}

function updateAttendance(usernames) {
    attendanceSheet = usernames.map(function(username) {
        return { username: "@" + username, attended: false };
    });
    saveAttendanceData(); // Save attendance data to localStorage
}

function updateAttendanceSheet() {
    var tableBody = document.getElementById("attendanceSheet");
    tableBody.innerHTML = `
        <tr>
            <th>Username</th>
            <th>Attended</th>
        </tr>
    `;
    attendanceSheet.forEach(function(item) {
        var newRow = `
            <tr>
                <td>${item.username}</td>
                <td><input type="checkbox" ${item.attended ? "checked" : ""} onchange="markAttendance('${item.username}')" /></td>
            </tr>
        `;
        tableBody.innerHTML += newRow;
    });
}

function markAttendance(username) {
    var userIndex = attendanceSheet.findIndex(function(item) {
        return item.username === username;
    });
    if (userIndex !== -1) {
        attendanceSheet[userIndex].attended = !attendanceSheet[userIndex].attended;
        saveAttendanceData(); // Save attendance data to localStorage
    }
    document.getElementById("usernameInput").value = ""; // Clear input field
    updateAttendanceSheet(); // Update attendance sheet display
}

function findNotAttended() {
    var notAttended = attendanceSheet.filter(function(item) {
        return !item.attended;
    }).map(function(item) {
        return item.username;
    });

    if (notAttended.length > 0) {
        alert("Users who have not attended: " + notAttended.join(", "));
    } else {
        alert("All users have attended!");
    }
}

function copyUsernames() {
    var notAttendedUsernames = attendanceSheet.filter(function(item) {
        return !item.attended;
    }).map(function(item) {
        return item.username;
    }).join("\n");

    if (notAttendedUsernames) {
        navigator.clipboard.writeText(notAttendedUsernames)
            .then(() => alert("Usernames of those not attended copied to clipboard!"))
            .catch((error) => console.error("Failed to copy usernames: ", error));
    } else {
        alert("All users have attended!");
    }
}

function resetTracker() {
    attendanceSheet = []; // Clear attendance data
    saveAttendanceData(); // Save empty attendance data to localStorage
    document.getElementById("usernameInput").value = ""; // Clear input field
    updateAttendanceSheet(); // Update attendance sheet display
}

function saveAttendanceData() {
    localStorage.setItem('attendanceSheet', JSON.stringify(attendanceSheet));
}