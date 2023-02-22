//if(localStorage.getItem("loggedUser")!=null)
let loggedUser;
let loggedUserPetHistory;
let loggedChatHistory = []; // only 10 messages 5 each
async function tryLogin(){
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    document.getElementById("password").value=""
    const user = {
        username: email,
        password: password,
    };
    const response = await makeRequest("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await response.json();
    switch (response.status) {
        case 201:
            {
                // login ok
                successLogin(json.user,json.petHistory,json.chatHistory);
                break;
            }
        case 401:
            {
                // Password error
                failedLoginSignup(json)
                break;
            }
        case 404:
            {
                // No user
                failedLoginSignup(json)
                break;
            }
    }
    
}
function successLogin(username,petHistory,chatHistory){
    loggedUser = username  // fill the global variable
    loggedUserPetHistory = petHistory // fill the global variable
    loggedChatHistory = chatHistory
    document.cookie = `loggedUser=${username};max-age=86400`; // one day
    document.cookie = `loggedUserPetHistory=${petHistory};max-age=86400`; // one day
    scrollRight();
    afterLogin()

}

function failedLoginSignup(json){
    document.getElementById("pMsg").innerHTML = json.msg;
    document.getElementById("password").value = "";
}

function logout(){
    document.cookie = `loggedUser=${loggedUser};max-age=-1`;
    document.cookie = `loggedUserPetHistory=${loggedUserPetHistory};max-age=-1`; // one day
    stopPet()
    loggedUser=null;
    loggedUserPetHistory = null;
    loggedChatHistory = null;
    myPet=null;
    setTimeout(logout_hideThings(), 2200);
}
function logout_hideThings(){
    petElementsVisibility("hide")
    createNewPetMessage("hide")
}

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
            return cookie.split('=')[1];
        }
    }
    return null;
}


function isLogged(){
    return getCookie("loggedUser")!=null
}


async function trySignUp() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = {
        username: username,
        password: password
    };
    const response = await makeRequest("http://localhost:8080/signUp", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await response.json()
    failedLoginSignup(json)
}

async function makeRequest(url, options) {
    try {
        const response = await fetch(url, options);
        return response
    } catch (err) {
        console.log(err);
    }
}