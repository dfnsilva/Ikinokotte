//if(localStorage.getItem("loggedUser")!=null)
let loggedUser;
async function tryLogin(){
    console.log(loggedUser)
    if(loggedUser == null){
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;
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
                    successLogin(json);
                    break;
                }
            case 401:
                {
                    // Password error
                    failedLogin(json)
                    break;
                }
            case 404:
                {
                    // No user
                    failedLogin(json)
                    break;
                }
        }
    }
}
function successLogin(json){
    console.log(json.user)
    loggedUser = json.user
    console.log("nice login")
    scrollRight()
    createOrLoadPet()
    
}

function failedLogin(json){
    console.log("bad login")
    document.getElementById("pMsg").innerHTML = json.msg;
    document.getElementById("password").value = "";
}

function logout(){
    stopPet()
    loggedUser=null;
}



async function trySignUp() {
    //const email = document.getElementById("email").value;
    //const password = document.getElementById("password").value;
    const password = "admin";
    const email = "admin";
    const user = {
        username: nome,
        password: senha
    };
    const response = await makeRequest("http://localhost:8080/signUp", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await response.json();
    alert(json.msg)
    /*switch (response.status) {
        case 409:
            {
                // User
                document.getElementById("pMsg").innerHTML = json.msg;
                break;
            }
        case 400:
            {
                // Password inaceitável
                document.getElementById("pMsg").innerHTML = json.msg;
                break;
            }
        case 201:
            {
                // Utilizador registado
                document.getElementById("pMsg").innerHTML = json.msg;
                break;
            }
    }*/
}

async function makeRequest(url, options) {
    try {
        const response = await fetch(url, options);
        console.log(options)
        return response;
    } catch (err) {
        console.log(err);
    }
}