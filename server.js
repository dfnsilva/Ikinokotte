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
            id:users[users.length-1].id+1,
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
    const nome = req.body.username;
    const senha = req.body.password;
    for (user of users) {
        if (user.username === nome)
            if (user.password === senha) {
                return res.status(201).json({ 
                    id: user.id,
                    name: user.name,
                    petHistory:user.petHistory })
            } else {
                return res.status(401).json({ msg: "Invalid Password!" })
            }
    }
    return res.status(404).json({ msg: "User not found!" })
});

//


app.post("/newPet", (req, res) => {
    const userid = req.body.userid;
    const petname = req.body.petname;
    if (!userHasPet(userid)) {
        const newPet = {
            ownerId:userid,
            pet: new ikinokotte(petname)
        }
        pets.push(newPet);
        writeToDB("./db/pets.json", users);
        return res.status(201).send({
            msg: `New Pet created ${petname}`
        });
    } else {
        return res.status(409).send({
            msg: 'User already has a Pet Associated'
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
function userHasPet(id) {
    for (pet of pets)
        if (pet.userid === id) {
            return true;
        }
    return false;
}
function userExists(name) {
    for (user of users)
        if (user.username === name) {
            return true;
        }
    return false;

    
}


app.use(express());
app.use(express.static('public'));
app.listen(8080)
