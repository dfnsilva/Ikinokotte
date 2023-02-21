let chatHistory;
async function sendMessage(){
    var msg = document.getElementById("talk").value
    chatHistory += `\n${loggedUser}:`+msg+`.pet stats= [ health:${myPet.health}/100 ; food:${myPet.food}/200 ; water:${myPet.water}/100 ; mood:${myPet.mood}/100].\nPet:`;
    addMessageToChat(msg)
    scrollToBottom();
    document.getElementById("talk").value = ""
    const response = await makeRequest("http://localhost:8080/chat", {
        method: "POST",
        body: JSON.stringify({ chatHistory,loggedUser,myPet }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await response.json();
    
    addAnswerToChat(json.message)
    chatHistory+=json.message
    console.log(chatHistory)
    scrollToBottom();
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
}