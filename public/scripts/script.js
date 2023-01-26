/*function testIncrement(){
    let cookie = getCookie('ikinokotte')
    console.log(cookie)
    cookie = Number(cookie)+5;
    setCookie('ikinokotte',cookie)
    document.getElementById("test").innerHTML = cookie
}

function testReduce() {
    let cookie = getCookie('ikinokotte')
    console.log(cookie)
    cookie = cookie-0.1;
    setCookie('ikinokotte',cookie.toFixed(1))
    document.getElementById("test").innerHTML = cookie.toFixed(1);
    //save date
}

function startTest(){
    makeThingsAppear()
    var pet =getCookie('ikinokotte')
    document.getElementById("test").innerHTML = pet
    if(pet == null){
        console.log("no cookie")
        setCookie('ikinokotte',50)
    }else{
        console.log('yes cookie')
        console.log(pet)
    }
    setInterval(testReduce, 1000);
}
function makeThingsAppear(){
    [].forEach.call(document.querySelectorAll('.hide1'), function (el) {
        el.style.visibility = 'visible';
      });
    document.getElementById('start').style.visibility = "hidden";
}

function getCookie(name){
    const cookies = document.cookie;

    // Split the cookies into an array
    const cookieArray = cookies.split("; ");
  
    // Find the cookie with the matching name
    const cookie = cookieArray.find(cookie => cookie.startsWith(`${name}=`));
  
    // Return the cookie value as an object
    return cookie ? JSON.parse(cookie.substring(name.length + 1)) : null;
}

function setCookie(name, value) {
    // Convert the Tamagotchi object to a string
    const valueString = JSON.stringify(value);
    console.log("teste teste")
    var expires = "";
    var date = new Date();
    date.setTime(date.getTime() + (30*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    // Set the cookie with the Tamagotchi data
    document.cookie = `${name}=${valueString}; ${expires}=${date}; path=/`;
  }*/


  $("#volume").slider({
    min: 0,
    max: 100,
    value: 0,
    range: "min",
    slide: function(event, ui) {
      setVolume(ui.value / 100);
    }
  });
  
  var myMedia = document.createElement('audio');
  $('#player').append(myMedia);
  myMedia.id = "myMedia";

  playAudio('', 0);
  
  function playAudio(fileName, myVolume) {
          myMedia.src = fileName;
          myMedia.setAttribute('loop', 'loop');
      setVolume(myVolume);
      myMedia.play();
  }
  
  function setVolume(myVolume) {
  var myMedia = document.getElementById('myMedia');
  myMedia.volume = myVolume;
  }
