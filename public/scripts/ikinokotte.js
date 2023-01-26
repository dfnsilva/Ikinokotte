  //TODO LIST
  //fuse update health functions
  //finish update resources functions
  //-finish the class with each function
  //create the timer threads
  //create the create a new and start a pet function
  //create the sync up with passed time func
  
  
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
class ikinokotte {
    constructor(name) {
      this.name = name;
      this.age = 0;
      this.health = 100;

      this.food = 40;
      this.water = 100;
      this.mood = 50;

    }
    // Update the ikinokotte's health every minute
    updateHealth() {
        setInterval(() => {
          this.health += this.healthRate
          if (this.health <= 0) {
            console.log(`${this.name} has died.`);
            clearInterval(this.updateHealth);
            //send to server the notice
          }
        }, 1000);//CHANGE TO REAL TIME
      }
    updateHealth(){
        // FOOD
        if(this.food <20 || this.food > 180){
            this.health-=10;
        }else if((this.food>=20 && this.food<70) || (this.food>140 && this.food<=180)){
            this.health-=1;

        }

        if(this.water <40){
            this.health-=2;
        }
        /*
        if(this.happiness <0){
            this.healthRate-=2;
            this.waterRate=(100-this.water)/10;
            this.waterRate.toFixed(0);
        }*/

    }
  
    
  
    // Feed the ikinokotte
    feed(foodType) {
        switch(foodType){
            case "bread":
                
                this.food += 5;
                this.mood += 1;
                break;
            case "mega bread":
                this.food += 50;
                this.mood += 10;
                break;
        }

        this.food.clamp(0,200)
    }

    drink() {
        this.water += 5;
        this.mood += 1;
        this.food.clamp(-100,100)

    }

    play() {
        this.mood += 10;
        this.water-=2;
        this.food-=5;
        this.food.clamp(0,100)
    }
    updateResourses(){
        /*
        if(this.food <20 || this.food > 180){
            this.foodRate=(200-this.food+20)/20;
            this.foodRate.toFixed(0);
        }else if((this.food>=20 && this.food<70) || (this.food>140 && this.food<=180)){
            this.foodRate=(200-this.food+20)/20;
            this.foodRate.toFixed(0);
        }else if(this.food>=70 && this.food<=140){
            this.foodRate=1;
        }
        if(this.water <40){
            this.health-=2;
            this.waterRate=(100-this.water)/10;
            this.waterRate.toFixed(0);
        }*/
    }
    
    age(){
        console.log("age")
    }
  }

  // Create a new ikinokotte
  const ikinokotte = new ikinokotte("Tommy");
  
  // Start updating the ikinokotte's health
  ikinokotte.updateHealth();
  
  // Feed the ikinokotte
  ikinokotte.feed();
  console.log(`${ikinokotte.name} was fed. food: ${ikinokotte.food} mood: ${ikinokotte.mood}`);