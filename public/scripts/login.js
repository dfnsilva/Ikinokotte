

async function tryLogin(){
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = {
        username: email,
        password: password,
    };
    console.log(user)
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
function successLogin(json){
    //document.getElementById('showLogin').style.opacity = 0
    //change to other screen
    //load pet
    console.log(json.id)
    localStorage.setItem("userId",json.id)
    console.log("nice login")
}
function failedLogin(json){
    alert(json.msg)
    console.log("bad login")
    document.getElementById("password").value = "";
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