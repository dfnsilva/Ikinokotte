function alterHealth(){
    document.getElementById("health").innerHTML = myPet.health
}
function alterFood(){
    document.getElementById("food").innerHTML = myPet.food
}
function alterWater(){
    document.getElementById("water").innerHTML = myPet.water
}
function alterMood(){
    document.getElementById("mood").innerHTML = myPet.mood
}
function alterName(){
    document.getElementById("name").innerHTML = myPet.name
}
function scrollRight(){
    document.getElementById('page1').classList.add('animate1')
    document.getElementById('page2').classList.add('animate2')
    document.getElementById('page1').classList.remove('animate3')
    document.getElementById('page2').classList.remove('animate4')
}
function scrollLeft(){
    document.getElementById('page1').classList.add('animate1')
    document.getElementById('page2').classList.add('animate2')
    document.getElementById('page1').classList.remove('animate3')
    document.getElementById('page2').classList.remove('animate4')
}
/*
Name:<div id="name"></div>
            Health:<div id="health"></div>
            Food:<div id="food"></div>
            Water:<div id="water"></div>
            Mood:<div id="mood"></div>

*/
/*
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
  }*/

  