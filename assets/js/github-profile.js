// Function to fetch and display GitHub profile
async function fetchGitHubProfile() {
    const username = "arshadkh507"; // Replace with your GitHub username
    const githubAPI = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(githubAPI);
        if (response.ok) {
            const data = await response.json();
            const avatar = document.getElementById("github-avatar");
            const usernameElement = document.getElementById("github-username");
            const bioElement = document.getElementById("github-bio");
            const linkElement = document.getElementById("github-link");

            avatar.src = data.avatar_url;
            usernameElement.textContent = data.login;
            bioElement.textContent = data.bio || "No bio available";
            linkElement.href = data.html_url;
        } else {
            console.error("Failed to fetch GitHub profile data.");
        }
    } catch (error) {
        console.error("Error while fetching GitHub profile:", error);
    }
}

// Call the function to fetch and display your GitHub profile
fetchGitHubProfile();
