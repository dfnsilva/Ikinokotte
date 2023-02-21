/**/
const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();


app.use(express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let users = require('./db/users');
let pets = require('./db/pets');

app.post("/signUp", (req, res) => {
    const username = req.body.username;
    if (!userExists(username)) {
        const newUser = {
            username: username,
            password: req.body.password,
            petHistory: "tbd"
        }
        if (newUser.password.length < 5) {
            return res.status(400).send({
                msg: 'Password should have 5 or more characters'
            });
        }
        users.push(newUser);
        writeToDB("./db/users.json", users);
        return res.status(201).send({
            msg: `User created ${username}`
        });
    } else {
        return res.status(409).send({
            msg: 'User already exists'
        });
    }
});


//Login

app.post("/login", (req, res) => {
    const name = req.body.username;
    const senha = req.body.password;
    for (user of users) {
        if (user.username === name)
            if (user.password === senha) {
                return res.status(201).json({
                    user: user.username,
                    petHistory:user.petHistory })
            } else {
                return res.status(401).json({ msg: "Invalid Password!" })
            }
    }
    return res.status(404).json({ msg: "User not found!" })
});

//~

app.post("/deletePetUpdateUser", (req, res) => {
    
    const owner = req.body.ownerName;
    let dbAux = [];
    for (pet of pets){
        if (pet.owner != owner) {
            dbAux.push(pet);
        }
    }
    pets = [];
    for (let i = 0; i < dbAux.length; i++) {
        pets.push(dbAux[i]); // copia os dados
    }

    const petHistoryEntry= req.body.petHistory;
    for (user of users){
        if (user.username == owner) {
            user.petHistory+= petHistoryEntry
            break
        }
    }
    writeToDB("./db/users.json", users);
    writeToDB("./db/pets.json", pets);
    return res.status(201).send({
        msg: `Pet Deleted and User Updated deleted`
    });
    
});

app.get("/getSavedPet/:name", (req, res) => {
    const owner = req.params.name;
    for (pet of pets){
        if (pet.owner == owner) {
            return res.status(201).send({
                msg: `User saved Pet: ${pet.name}`,
                pet: pet
            });
        }
    }
    return res.status(409).send({
        msg: 'User has no saved pet'
    }); 
});

app.post("/savePet", (req, res) => {
    const savePet = req.body;
    if(!userHasPet(req.body.owner)){
        pets.push(savePet);
        writeToDB("./db/pets.json", pets);
        return res.status(201).send({
            msg: `New Pet Save Created`
        });
    }else{
        let dbAux = [];
        for (pet of pets){
            if (pet.owner == savePet.owner) {
                dbAux.push(savePet);
            }else{
                dbAux.push(pet);
            }
        }
        pets = [];
        for (pet of dbAux){
            pets.push(pet); // copia os dados
        }
        writeToDB("./db/pets.json", pets);
        return res.status(201).send({
            msg: `Pet Saved`
        });
    }
    
});
/* chat gpt */

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);
app.post('/chat', async (req, res) => {
    const messages = req.body.chatHistory;
    console.log(messages)
    const gpt = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "The following is a conversation between a pet and an owner, you are the pet. The pet speaks in simple language, and is , your owner is Delda and your name is test1 your stats are [ health:80/100 ; food:2/200 ; water:70/100 ; mood:50/100] try to not mention your stats. your job is ask for things to make your health better and chat with the Onwer."+messages+"\nPet:",
        temperature: 0.9,
        max_tokens: 3800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: ["Owner:", "Pet:"],
    });
    console.log("worked\n")
    console.log(gpt.data.choices[0].text)
    return res.status(201).send({
        message: gpt.data.choices[0].text
    });
  });


function writeToDB(fich, db) {
    fs.writeFile(fich, JSON.stringify(db, null, 4), 'utf8', err => {
        if (err) {
            console.log(`Error writing file: ${err}`)
        } else {
            console.log('Wrote on file ' + fich);  // Sucesso
        }
    })
}
function userHasPet(userName){
    for (pet of pets){
        if (pet.owner === userName){
            return true
        }
    }
    return false

}
function userExists(name) {
    for (user of users)
        if (user.username === name) {
            return true;
        }
    return false
}



  

app.use(express());
app.use(express.static('public'));
app.use('/node_modules/nes.css/css/nes.min.css', express.static(__dirname + '/node_modules/nes.css/css/nes.min.css', { type: 'text/css' }));
app.listen(8080)
