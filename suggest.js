let cooldown = false;

async function message() {
    if (cooldown) {
        button.innerText = "Please wait.";
        button.disabled = true;
        setTimeout(() => {
            button.innerText = "Send";
            button.disabled = false;
        }, 1000);
        return;
    }

    let name = document.getElementById("name").value;
    let content = document.getElementById("content").value;
    let button = document.getElementById("Send");

    if (!name && !content) {
        alert("Please fill in your name and suggestion.");
        return;
    }
    if (!content) {
        alert("Please fill in your suggestion.");
        return;
    }
    if (!name) {
        alert("Please fill in your name.");
        return;
    }

    cooldown = true;
    button.innerText = "Sending";
    button.disabled = true;

    fetch("https://japey.bontboss.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `# New Suggestion!\n\n**User:** ${name}\n**Content:** ${content}`
        })
    })
    .then(response => response.json())
    .then(() => {
        button.innerText = "Sent!";
        setTimeout(() => {
            button.innerText = "Send";
            button.disabled = false;
            cooldown = false;
        }, 5000);
    })
    .catch(() => {
        alert("Message didn't send, Please try sending it again.");
        button.innerText = "Send";
        button.disabled = false;
        cooldown = false;
    });
}