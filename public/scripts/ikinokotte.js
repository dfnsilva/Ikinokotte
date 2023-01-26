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

    startPet(){
        this.updateHealth();
        this.updateResourses();
    }
    // Update the ikinokotte's health every minute

    async updateHealth(){
        setInterval(() => {
            console.log(`${this.health} health.`)
            if(this.food <20 || this.food > 180){
                this.health-=10;
            }else if((this.food>=20 && this.food<70) || (this.food>140 && this.food<=180)){
                this.health-=1;
            }

            if(this.water <40){
                this.health-=2;
            }else if(this.water>=40 && this.water<80){
                this.health-=1
            }else{
                this.health
            }

            
            if(this.mood <0){
                this.health-=2;
            }else if(this.mood <=80){
                this.health-=5;
            }
            this.health.toFixed(0);
            this.health.clamp(0,100)
            console.log(`${this.health} health.`)

            if (this.health <= 0) {
              console.log(`${this.name} has died.`);
              clearInterval(this.updateHealth);
              //send to server the notice
            }
          }, 5000);//CHANGE TO REAL TIME
        // FOOD
    }

    async updateResourses(){
        setInterval(() => {
            if(this.food <20){
                this.food-=5;
            }else if((this.food>=20 && this.food<70)){
                this.food-=3;
            }else if((this.food>140 && this.food<=180)){
                this.food-=2;
            }else{
                this.food-=1;
            }
            this.food.clamp(0,200)
            
            if(this.water <40){
                this.water-=4;
            }else if(this.water>=40 && this.water<80){
                this.water-=2
            }else{
                this.water-=1
            }
            this.water.clamp(0,200)

            
            if(this.mood <0){
                this.health-=2;
            }else if(this.mood <-80){
                this.health-=5;
            }
            
        
          }, 2500);//CHANGE TO REAL TIME
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

    // give water to the ikinokotte
    drink() {
        this.water += 5;
        this.mood += 1;
        this.food.clamp(-100,100)

    }


    // increase mood 
    play() {
        this.mood += 10;
        this.water-=2;
        this.food-=5;
        this.food.clamp(0,100)
    }
    
    
    age(){
        console.log("age")
    }
  }