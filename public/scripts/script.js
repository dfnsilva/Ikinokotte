function alterHealth(){
    if(myPet.health < 20){
        document.getElementById('healthBar').classList.remove('yellow')
        document.getElementById('healthBar').classList.remove('blue')
        document.getElementById('healthBar').classList.add('red')
    }else if(myPet.health >= 20 && myPet.health <= 50) {
        document.getElementById('healthBar').classList.add('yellow')
        document.getElementById('healthBar').classList.remove('blue')
        document.getElementById('healthBar').classList.remove('red')
    }else{
        document.getElementById('healthBar').classList.remove('yellow')
        document.getElementById('healthBar').classList.add('blue')
        document.getElementById('healthBar').classList.remove('red')
    }
    document.getElementById("health").innerHTML = myPet.health
    document.getElementById("healthBar").style.width = `${myPet.health}%`
}

function alterFood(){
    if(myPet.food < 20){
        document.getElementById('foodBar').classList.remove('yellow')
        document.getElementById('foodBar').classList.remove('blue')
        document.getElementById('foodBar').classList.add('red')
    }else if((myPet.food>=20 && myPet.food<70)){
        document.getElementById('foodBar').classList.add('yellow')
        document.getElementById('foodBar').classList.remove('blue')
        document.getElementById('foodBar').classList.remove('red')
    }else if(myPet.food>=70 && myPet.food<=140){
        document.getElementById('foodBar').classList.remove('yellow')
        document.getElementById('foodBar').classList.add('blue')
        document.getElementById('foodBar').classList.remove('red')
    }else if((myPet.food>140 && myPet.food<=180)){
        document.getElementById('foodBar').classList.add('yellow')
        document.getElementById('foodBar').classList.remove('blue')
        document.getElementById('foodBar').classList.remove('red')
    }else{
        document.getElementById('foodBar').classList.remove('blue')
        document.getElementById('foodBar').classList.remove('yellow')
        document.getElementById('foodBar').classList.add('red')
    }
    document.getElementById("food").innerHTML = myPet.food
    document.getElementById("foodBar").style.width = `${myPet.food/2}%`
}

function alterWater(){
    if(myPet.water <40){
        document.getElementById('waterBar').classList.remove('yellow')
        document.getElementById('waterBar').classList.remove('blue')
        document.getElementById('waterBar').classList.add('red')
    }else if(myPet.water>=40 && myPet.water<80){
        document.getElementById('waterBar').classList.add('yellow')
        document.getElementById('waterBar').classList.remove('blue')
        document.getElementById('waterBar').classList.remove('red')
    }else{
        document.getElementById('waterBar').classList.remove('yellow')
        document.getElementById('waterBar').classList.add('blue')
        document.getElementById('waterBar').classList.remove('red')
    }
    document.getElementById("water").innerHTML = myPet.water
    document.getElementById("waterBar").style.width = `${myPet.water}%`
}

function alterMood(){
    if(myPet.mood <0){
        document.getElementById('moodBar').classList.remove('yellow')
        document.getElementById('moodBar').classList.remove('blue')
        document.getElementById('moodBar').classList.add('red')
    }else if(myPet.mood <=80){
        document.getElementById('moodBar').classList.add('yellow')
        document.getElementById('moodBar').classList.remove('blue')
        document.getElementById('moodBar').classList.remove('red')
    }else{
        document.getElementById('moodBar').classList.remove('yellow')
        document.getElementById('moodBar').classList.add('blue')
        document.getElementById('moodBar').classList.remove('red')
    }
    document.getElementById("mood").innerHTML = myPet.mood
    console.log(`${(myPet.mood+100)/2}%`)
    document.getElementById("moodBar").style.width = `${(myPet.mood+100.1)/2}%`
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
function getOutOfMyWay(status){
    var elements = document.getElementsByClassName("loginD");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.visibility = status;
        }
}
function showPetDeadMessage(name){
    document.getElementById("newPetPopup").style.visibility = "visible"
    document.getElementById("petMessage").innerHTML = name+" pet has died "
}
function createNewPetMessage(show){
    
    if(show=="show"){
        document.getElementById("newPetPopup").style.visibility = "visible"
    }else{
        document.getElementById("newPetPopup").style.visibility = "hidden"
    }
}

function petElementsVisibility(show){
    if(show=="show"){
        var elements = document.getElementsByClassName("petThings");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.visibility = "visible";
        }
    }else{
        var elements = document.getElementsByClassName("petThings");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.visibility = "hidden";
        }
    }
    
}
function fancyStatsAnim(appear){
    if(appear=="appear"){
        var elements = document.getElementsByClassName("petThings");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.opacity = "0";
            elements[i].classList.add('fancyAnimationAppear')
            elements[i].classList.remove('fancyAnimationDisappear')
        }
    }else{
        console.log("disappear")
        var elements = document.getElementsByClassName("petThings");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.opacity = "1";
            elements[i].classList.remove('fancyAnimationAppear')
            elements[i].classList.add('fancyAnimationDisappear')
        }
    }
}


/*
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
*/ 

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

  