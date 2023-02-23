
let myPet;
let owner;
let UHintervalId;
let URintervalId;
function newPet(name,ownerName){
    return new ikinokotte(name,ownerName);
}

function age(){
    myPet.age = getAge(myPet.birth)
}
function clampAllVariables(){
    myPet.food = Math.min(Math.max(myPet.food, 0), 200);
    myPet.water = Math.min(Math.max(myPet.water, 0), 100);
    myPet.health = Math.min(Math.max(myPet.health, 0), 100);
    myPet.mood = Math.min(Math.max(myPet.mood, -100), 100);
}
function giveWater(){
    waterType="normal";
    switch(waterType){
        case "normal":
            myPet.water += 30;
            myPet.mood += 2;
            break;
        case "mega normal":
            myPet.water += 5;
            myPet.mood += 1;
            break;
        default:
            myPet.water += 1;
            myPet.mood += 1;

    }
    clampAllVariables()
    savePetToCookie(loggedUser+'ikinokotte',myPet)
    updateScreen()
}
function giveFood(){
    foodType="bread";
    switch(foodType){
        case "bread":
            myPet.food += 30;
            myPet.mood += 10;
            break;
        case "mega bread":
            myPet.food += 50;
            myPet.mood += 10;
            break;
        default:
            myPet.food += 1;
            myPet.mood += 1;
    }
    clampAllVariables()
    savePetToCookie(loggedUser+'ikinokotte',myPet)
    updateScreen()
}
function playPet(){
    playType="normal";
    switch(playType){
        case "normal":
            myPet.mood += 10;
            myPet.water-=2;
            myPet.food-=5;
            break;
        case "run":
            myPet.mood += 5;
            myPet.water-=5;
            myPet.food-=1;
            break;
        default:
            myPet.mood += 1;
            myPet.water-=1;
            myPet.food-=1;
    }
    
    clampAllVariables()
    savePetToCookie(loggedUser+'ikinokotte',myPet)
    updateScreen()
}

function savePetToCookie(cookiename,object) {
    const objJson = JSON.stringify(object);
    document.cookie = `${cookiename}=${objJson};max-age=31536000`; // one year
}

function loadPetFromCookie(cookiename) {
    const cookies = document.cookie.split(';');
    let petJSON;
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${cookiename}=`)) {
            petJSON = cookie.split('=')[1];
            break;
        }
    }

    if (petJSON) {
        return JSON.parse(petJSON);
    } else {
        return null;
    }
}

function afterLogin(){
    myPet =loadPetFromCookie(loggedUser+'ikinokotte')
    if(myPet == null){
        popupPetToggle();
    }else{
        petElementsVisibility("show")
        setTimeout(fancyStatsAnim("appear"),100);
        startPet();
    }
}
function createNewPet(){
    petName = document.getElementById("petName").value
    myPet = newPet(petName,loggedUser);
    popupPetToggle();
    savePetToCookie(loggedUser+'ikinokotte',myPet)
    petElementsVisibility("show")
    setTimeout(fancyStatsAnim("appear"),100);
    startPet()
}
async function checkSavedPet(){
    const response = await makeRequest("http://localhost:8080/getSavedPet/"+loggedUser, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    stopPet()
    json = await response.json();
    petJSON = json.pet
    myPet = petJSON
    myPet.lastVisited = new Date()
    startPet()
}
async function savePetToDB(){

    const response = await makeRequest("http://localhost:8080/savePet", {
        method: "POST",
        body: JSON.stringify(myPet),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await response.json();
}

function calculateTimeAway(lastTime){
    var cycles = calculateCyclesMissed(lastTime);
    console.log(myPet.food)
    for (let i = 1; i < cycles; i++) {
        console.log(i)
        updateResources()
        updateResources()
        updateHealth()
    }

}
async function startUpdateResourcesTimer(){
    URintervalId = setInterval(() => {
        updateResources()
    }, 1000*30);//every 30 seconds

}

async function startUpdateHealthTimer(){
    UHintervalId = setInterval(() => {
        updateHealth()
        myPet.lastVisited = new Date();
    }, 1000*60);//every 1 minute
    
}
function startPet(){
    calculateTimeAway(myPet.lastVisited)
    alterName();
    updateScreen();
    startUpdateHealthTimer();
    startUpdateResourcesTimer();
}
function stopPet(){
    clearInterval(UHintervalId);
    clearInterval(URintervalId);
}

function updateScreen(){
    alterFood();
    alterHealth();
    alterMood();
    alterWater();
}

async function updateResources(){
    if(myPet.food <20){
        myPet.food-=5;
        myPet.mood-=10;
    }else if((myPet.food>=20 && myPet.food<70)){
        myPet.food-=4;
    }else if((myPet.food>=70 && myPet.food<140)){
        myPet.food-=2;
    }else if((myPet.food>140 && myPet.food<=180)){
        myPet.food-=1;
    }else{
        myPet.food-=1;
        myPet.mood-=10;
    }
    
    if(myPet.water <40){
        myPet.water-=4;
        myPet.mood-=5;
    }else if(myPet.water>=40 && myPet.water<80){
        myPet.water-=2
    }else{
        myPet.water-=1
    }
    
    if(myPet.mood <0){
        myPet.mood-=2;
        myPet.food-=5;
    }else if(myPet.mood <80){
        myPet.mood-=1;
    }

    clampAllVariables();
    updateScreen()
    savePetToCookie(loggedUser+'ikinokotte',myPet)
}

async function updateHealth(){
    if(myPet.food <20){
        myPet.health-=10;
    }else if((myPet.food>=20 && myPet.food<70) ){
        myPet.health-=2;
    }else if((myPet.food>=70 && myPet.food<140)){
        myPet.health+=2;
    }else if((myPet.food>=140 && myPet.food<=180)){
        myPet.health-=1;
    }else if( myPet.food > 180){
        myPet.health-=4;
    }

    if(myPet.water <40){
        myPet.health-=2;
    }else if(myPet.water>=40 && myPet.water<80){
        myPet.health+=1;
    }else{
        myPet.health-=1;
    }
    
    if(myPet.mood <0){
        myPet.health-=1;
    }else if(myPet.mood <=80){
        myPet.health+=1;
    }else{
        myPet.health+=2;
    }

    myPet.health = Math.min(Math.max(myPet.health, 0), 100);
    age()
    myPet.lastVisited = new Date() 
    alterHealth();
    if (myPet.health <= 0) {
        showPetDeadMessage(myPet.name)
        setTimeout(fancyStatsAnim("disappear"),100);
        petHistoryMaker(myPet)
        setTimeout(clearTimers(),500);
        myPet=null
        //send to server the notice
    }
    savePetToCookie(loggedUser+'ikinokotte',myPet)
}
function clearTimers(){
    clearInterval(UHintervalId);
    clearInterval(URintervalId);
    UHintervalId=null;
    URintervalId=null;
}
function petHistoryMaker(pet){
    var historyString = ""
    historyString+="owner="+pet.owner+",";
    historyString+="name="+pet.name+",";
    historyString+="birth="+pet.birth+",";
    historyString+="age="+pet.age+",";
    historyString+="food="+pet.food+",";
    historyString+="water="+pet.water+",";
    historyString+="mood="+pet.mood+";";
    loggedUserPetHistory+=historyString
    updatePetHistoryAndDeletePetSave(pet.owner,historyString)

}
async function updatePetHistoryAndDeletePetSave(owner,history){
    const petDelete = {
        ownerName: owner,
        petHistory: history
    }
    const response = await makeRequest("http://localhost:8080/deletePetUpdateUser", {
        method: "POST",
        body: JSON.stringify(petDelete),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    json = await response.json();

    
}


//createOrLoadPet();