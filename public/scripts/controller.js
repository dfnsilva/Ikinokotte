function newPet(name){
    return new ikinokotte(name);
}
function giveWater(){
    var pet = getCookie('ikinokotte');
    console.log(`${pet.water} drink`);
    pet.drink();
    console.log(pet.water);
    setCookie('ikinokotte',cookie);
}

function savePet(name, value) {
    // Convert the Tamagotchi object to a string
    const valueString = JSON.stringify(value);
    console.log("teste save Pet")
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (30*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    // Set the cookie with the Tamagotchi data
    document.cookie = `${name}=${valueString}; ${expires}=${date}; path=/`;
}

function loadPet(){
    const cookies = document.cookie;

    // Split the cookies into an array
    const cookieArray = cookies.split("; ");
  
    // Find the cookie with the matching name
    const cookie = cookieArray.find(cookie => cookie.startsWith(`${name}=`));
  
    // Return the cookie value as an object
    return cookie ? JSON.parse(cookie.substring(name.length + 1)) : null;
}
  // Create a new ikinokotte
  
  // Start updating the ikinokotte's health
  /*
  ikinokotte.updateHealth();
  
  // Feed the ikinokotte
  ikinokotte.feed();
  console.log(`${ikinokotte.name} was fed. food: ${ikinokotte.food} mood: ${ikinokotte.mood}`);
    */




function startSimu(){
    //makeThingsAppear()
    var pet =getCookie('ikinokotte')
    if(pet == null){
        console.log("no cookie");
        pet = newPet("Test1");
        setCookie('ikinokotte',pet)
    }else{
        console.log('yes cookie')
        console.log(pet)
    }
    pet.updateHealth();
    pet.updateResources();
}

