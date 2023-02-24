let chatHistory = "";
let lastMessageSentTime = 0;
const cooldownTime = 5000; // cooldown time in milliseconds
async function sendMessage(){
    const currentTime = new Date().getTime();
    if (currentTime - lastMessageSentTime < cooldownTime) {
        // still on cooldown, do nothing
        return;
    }else{
        lastMessageSentTime = new Date().getTime();
        var msg = document.getElementById("talk").value
        chatHistory = `\n${loggedUser}:`+msg+`.pet stats= 
            [ health:${myPet.health}/100 ; food:${myPet.food}/200 ; 
            water:${myPet.water}/100 ; mood:${myPet.mood}/100].\nPet:`;

        addMessageToChat(msg)
        
        document.getElementById("talk").value = ""
        startChatCooldownAnimation()
        const response = await makeRequest("www.ikinokotte.site/chat", {
            method: "POST",
            body: JSON.stringify({ chatHistory,loggedUser,myPet }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        json = await response.json();
        addAnswerToChat(json.message)
        chatHistory+=json.message
        
    }
}

//chatHistory += 
function startChatCooldownAnimation(){
    var button = document.getElementById("enter")
    button.style.backgroundColor= "rgb(55, 55, 55)";
    setTimeout(() => {
        button.style.backgroundColor= "rgb(255, 255, 255)";
      }, cooldownTime);
}

function scrollToBottom() {
    const container = document.getElementById("scrollChat");
    container.scrollTop = container.scrollHeight;
  }
function addAnswerToChat(msg){
    document.getElementById("messages").innerHTML+=`
    <section class="message -left">
        <!-- Balloon -->
        <div class="nes-balloon from-left" style="word-wrap: break-word; width: 95%;">
            <p>${msg}</p>
        </div>
    </section>
    `
    scrollToBottom();
}
function addMessageToChat(msg){
    document.getElementById("messages").innerHTML+=`
    <section class="message -right">
        <!-- Balloon -->
        <div class="nes-balloon from-right" style="word-wrap: break-word; width: 95%;">
            <p>${msg}</p>
        </div>
    </section>
    `
    scrollToBottom();
}