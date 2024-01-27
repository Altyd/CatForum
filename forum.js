// forum.js

document.addEventListener("DOMContentLoaded", function () {
    const threadsContainer = document.getElementById("threads-container");
    const threadForm = document.getElementById("thread-form");
    const replyForm = document.getElementById("reply-form");

    // Load existing threads from JSON file on page load
    loadThreads();

    function loadThreads() {
        const storedThreads = localStorage.getItem("forum_threads");
        const threads = storedThreads ? JSON.parse(storedThreads) : [];
        displayThreads(threads);
    }

    function displayThreads(threads) {
        threadsContainer.innerHTML = ""; // Clear existing threads

        threads.forEach((thread, index) => {
            const threadElement = document.createElement("div");
            threadElement.classList.add("thread");
            threadElement.innerHTML = `
                <h3>${thread.title}</h3>
                <p>By: ${thread.username}</p>
                <ul class="thread-replies" id="thread-${index}-replies"></ul>
            `;
            threadsContainer.appendChild(threadElement);

            // Display replies
            const repliesContainer = document.getElementById(`thread-${index}-replies`);
            thread.replies.forEach((reply) => {
                const replyElement = document.createElement("li");
                replyElement.textContent = `${reply.username}: ${reply.text}`;
                repliesContainer.appendChild(replyElement);
            });
        });
    }

    function saveThreads(threads) {
        localStorage.setItem("forum_threads", JSON.stringify(threads));
    }

    function createThread() {
        const username = document.getElementById("username").value;
        const threadTitle = document.getElementById("thread-title").value;

        if (username && threadTitle) {
            const thread = {
                username,
                title: threadTitle,
                replies: [],
            };

            const storedThreads = localStorage.getItem("forum_threads");
            const threads = storedThreads ? JSON.parse(storedThreads) : [];
            threads.push(thread);
            saveThreads(threads);
            loadThreads();
            threadForm.reset();
        } else {
            alert("Please enter both username and thread title.");
        }
    }

    function addReply() {
        const replyUsername = document.getElementById("reply-username").value;
        const replyText = document.getElementById("reply-text").value;

        if (replyUsername && replyText) {
            const threadIndex = threadsContainer.children.length - 1; // Index of the last thread
            const threadReplies = document.getElementById(`thread-${threadIndex}-replies`);

            const reply = {
                username: replyUsername,
                text: replyText,
            };

            const storedThreads = localStorage.getItem("forum_threads");
            const threads = storedThreads ? JSON.parse(storedThreads) : [];

            if (threads[threadIndex]) {
                threads[threadIndex].replies.push(reply);
                saveThreads(threads);
                displayThreads(threads);
                replyForm.reset();
            }
        } else {
            alert("Please enter both username and reply text.");
        }
    }

    // Add event listener for creating a thread
    if (threadForm) {
        threadForm.addEventListener("submit", function (event) {
            event.preventDefault();
            createThread();
        });
    }

    // Add event listener for submitting a reply
    if (replyForm) {
        replyForm.addEventListener("submit", function (event) {
            event.preventDefault();
            addReply();
        });
    }
});
