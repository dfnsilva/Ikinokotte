let myPet;
let UHintervalId;
let URintervalId;
function newPet(name){
    return new ikinokotte(name);
}
function giveWater(){
    console.log(`${myPet.water} drink`);
    myPet.drink("normal");
    alterWater();
    console.log(`${myPet.water} drink`);
}
function giveFood(){
    console.log(`${myPet.food} food`);
    myPet.feed("bread");
    alterFood();
    console.log(`${myPet.food} food`);
}
function playPet(){
    console.log(`${myPet.mood} mood`);
    myPet.play("normal")
    alterMood();
    console.log(`${myPet.mood} mood`);
}

function savePetToCookie(pet) {
    const petJSON = JSON.stringify(pet);
    document.cookie = `ikinokotte=${petJSON};max-age=31536000`; // one year
}

function loadPetFromCookie() {
    const cookies = document.cookie.split(';');
    let petJSON;
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('ikinokotte=')) {
            petJSON = cookie.substring(10);
            break;
        }
    }

    if (petJSON) {
        return new ikinokotte(JSON.parse(petJSON));
    } else {
        return null;
    }
}

function createOrLoadPet(){
    //makeThingsAppear()
    myPet =loadPetFromCookie()
    if(myPet == null){
        console.log("no cookie");
        myPet = newPet("Test1");
        savePetToCookie('ikinokotte',myPet)
    }else{
        console.log('yes cookie')
        console.log(myPet)
    }
}
function renewPet(){
    console.log("renew cookie");
    myPet = newPet("Test1");
    savePetToCookie('ikinokotte',myPet)
}


function startPet(){
    alterName();
    updateScreen();
    updateHealth();
    updateResources();
}
// Update the ikinokotte's health every minute
function updateScreen(){
    alterFood();
    alterHealth();
    alterMood();
    alterWater();
}
async function updateResources(){
    URintervalId = setInterval(() => {
        console.log(`${myPet.mood} mood1.`)
        console.log(`${myPet.water} water1.`)
        console.log(`${myPet.food} food1.`)

        if(myPet.food <20){
            myPet.food-=5;
            myPet.mood-=10;
        }else if((myPet.food>=20 && myPet.food<70)){
            myPet.food-=3;
        }else if((myPet.food>140 && myPet.food<=180)){
            myPet.food-=2;
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

        myPet.clampAllVariables();

        console.log(`${myPet.mood} mood2.`)
        console.log(`${myPet.water} water2.`)
        console.log(`${myPet.food} food2.`)
        updateScreen()
    
      }, 2500);//CHANGE TO REAL TIME

}

async function updateHealth(){
    UHintervalId = setInterval(() => {
        console.log(`${myPet.health} health1.`)
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
        console.log(`${myPet.health} health2.`)
        myPet.health = Math.min(Math.max(myPet.health, 0), 100);
        console.log(`${myPet.health} health3.`)
        alterHealth();
        if (myPet.health <= 0) {
          console.log(`${myPet.name} has died.`);
          clearInterval(UHintervalId);
          clearInterval(URintervalId);
          //send to server the notice
        }
      }, 5000);//CHANGE TO REAL TIME
}

createOrLoadPet();