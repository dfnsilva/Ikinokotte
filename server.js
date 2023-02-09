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
    console.log(req.body)
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
/* 

app.delete("/deleteProd/:name", (req, res) => {
    const name= req.params.name;
    let dbAux = [];
    for (prod of products){
        if (prod.name == name) {
            result=prod;
        }else{
            dbAux.push(prod);
        }
    }
    products = [];
    for (let i = 0; i < dbAux.length; i++) {
        products.push(dbAux[i]); // copia os dados
    }
    writeToDB("./db/products.json", products);
    return res.status(201).send({
        msg: `Product deleted`
    });
    
});

*/

app.get("/getSavedPet/:name", (req, res) => {
    const owner = req.params.name;
    for (pet of pets){
        console.log(owner)
        console.log(pet.owner)
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
        pets.push(pet);
        writeToDB("./db/pets.json", pets);
        return res.status(201).send({
            msg: `New Pet created`
        });
    }else{
        console.log(req.body)
        for (pet of pets){
            if (pet.owner == savePet.owner) {
                pet=savePet;
            }
        }
        pets = []
        console.log(req.body)
        pets.push(pet);
        writeToDB("./db/pets.json", pets);
        return res.status(201).send({
            msg: `Pet Saved`
        });
    }
    
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
app.listen(8080)
