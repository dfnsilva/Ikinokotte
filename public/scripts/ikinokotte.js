  //TODO LIST
  //create the sync up with passed time func
  
class ikinokotte {
    
    constructor(name,id) {
        this.id = id
        this.name = name;
        this.birth = 0;
        this.age = 0;
        this.health = 100;
        this.food = 40;
        this.water = 80;
        this.mood = 50;
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
            default:
                this.food += 1;
                this.mood += 1;
        }

        this.clampAllVariables()
    }

    // give water to the ikinokotte
    drink(waterType) {
        switch(waterType){
            case "normal":
                this.water += 5;
                this.mood += 1;
                break;
            case "mega normal":
                this.water += 5;
                this.mood += 1;
                break;
            default:
                this.water += 1;
                this.mood += 1;

        }
        this.clampAllVariables()
    }

    // increase mood 
    play(playType) {
        switch(playType){
            case "normal":
                this.mood += 10;
                this.water-=2;
                this.food-=5;
                break;
            case "run":
                this.mood += 5;
                this.water-=5;
                this.food-=1;
                break;
            default:
                this.mood += 1;
                this.water-=1;
                this.food-=1;
        }
        
        this.clampAllVariables()
    }
    
    age(){
        console.log("age")
    }
    clampAllVariables(){
        myPet.food = Math.min(Math.max(myPet.food, 0), 200);
        myPet.water = Math.min(Math.max(myPet.water, 0), 100);
        myPet.health = Math.min(Math.max(myPet.health, 0), 100);
        myPet.mood = Math.min(Math.max(myPet.mood, -100), 100);
    }
  }
