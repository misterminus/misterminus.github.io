function getip(){
    return fetch('https://api.ipify.org')
    .then((res) => res.text())
    .catch(() => "nil IP")
}

async function message() {
    let name = document.getElementById("name").value;
    let content = document.getElementById("content").value;
    let button = document.getElementById("Send");
    let ip = await getip();

    fetch("https://japey.bontboss.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `# Suggestion!\n**User:** ${name}\n**Content:** ${content}\n## User Information\n**IP:** ${ip}` })
    })
    .then(response => response.json())
    .then(() =>
    {
        name="";
        content="";

        button.innerText = "Sent!"
        button.disabled = true;

        setTimeout(() => {
            button.innerText = "Send"
        button.disabled = false;
        }, 1000);
    }
)
}
