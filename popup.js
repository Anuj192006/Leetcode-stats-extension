document.addEventListener("DOMContentLoaded", function() {
    const usernameInput = document.getElementById("user-input");
    const searchButton = document.getElementById("search-btn");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const acceptanceLabel = document.getElementById("acceptance-label");

    function checkusername(username) {
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchingleetcode(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            const fetching = await fetch(url);
            if (!fetching.ok) {
                throw new Error("Unable to go to the server");
            }
            const data = await fetching.json();
            return data;
        } catch (error) {
            alert(error);
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    searchButton.addEventListener("click", async function() {
        const username = usernameInput.value;
        if (username.trim() === "") {
            alert('Username should not be empty');
            return;
        }

        if (checkusername(username)) {
            const final_data = await fetchingleetcode(username);
            if (final_data) {
                easyLabel.textContent = final_data.easySolved;
                mediumLabel.textContent = final_data.mediumSolved;
                hardLabel.textContent = final_data.hardSolved;
                acceptanceLabel.textContent = final_data.acceptanceRate;
            }
        }
    });
});
