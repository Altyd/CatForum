// reply.js
async function fetchJsonData() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/Altyd/baf0e63608ec96905283d15949cb3271/raw?v=' + Math.random());
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}
// Function to create a reply element
function createReplyElement(username, text) {
    const replyElement = document.createElement('p');
    replyElement.textContent = `${username}: ${text}`;
    return replyElement;
}

// Function to render replies
async function renderReplies() {
    const repliesContainer = document.getElementById('replies-container');

    // Fetch JSON data
    const jsonDataURL = 'https://gist.githubusercontent.com/Altyd/baf0e63608ec96905283d15949cb3271/raw';
    const jsonData = await fetchJsonData();

    // Check if JSON data is available
    if (jsonData) {
        console.log('Updated Gist Content:', jsonData);
        // Clear existing replies
        repliesContainer.innerHTML = '';

        // Iterate through the replies and append them to the container
        jsonData.forEach(reply => {
            const replyElement = createReplyElement(reply.username, reply.text);
            repliesContainer.appendChild(replyElement);
        });
    }
}

// Event listener for the reply form submission
document.getElementById('reply-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get values from the form
    const username = document.getElementById('username').value;
    const replyText = document.getElementById('reply-text').value;

    // Add the new reply to the JSON data
    const newReply = {
        username: username,
        text: replyText
    };

    // Fetch JSON data, append the new reply, and re-render the replies
    const jsonData = await fetchJsonData();
    jsonData.push(newReply);

    // Update the Gist with the modified JSON data (optional)

    // Render the replies
    renderReplies();
});

// Initial render of replies
renderReplies();