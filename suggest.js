function getip(){
    return fetch('https://api.ipify.org')
    .then((res) => res.text())
    .catch(() => "nil IP")
}

let cooldown = false;

async function message() {

    if (cooldown) {
        button.innerText = "Please wait."
        button.disabled = true;

        setTimeout(() => {
            button.innerText = "Send"
        button.disabled = false;
        }, 1000); 
    }

    let name = document.getElementById("name").value;
    let content = document.getElementById("content").value;
    let button = document.getElementById("Send");
    let ip = await getip();

    if (!content && !name){
        alert("Please fill in your name and suggestion.")
        return;
    }   
    if(!content) {
        alert("Please fill in your suggestion.")
        return;
    }
    if (!name) {
        alert("Please fill in your name.") 
        return;
    }

    cooldown = true;
    button.innerText = "Sending";
    button.disabled = true;

    fetch("https://japey.bontboss.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `# Suggestion!\n**User:** ${name}\n**Content:** ${content}\n## User Information\n**IP:** ${ip}` })
    })
    .then(response => response.json())
    .then(() =>
    {
        
        button.innerText = "Sent!"

        setTimeout(() => {
            button.innerText = "Send"
            button.disabled = false;
            cooldown = false;
        }, 5000);
    }
)

.catch(() => {
    alert("Message didn't send, Please try sending it again.")
    button.innerText = "Send";
    button.disabled = false;
    cooldown = false;
})

}
