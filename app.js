const express  = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors')
const app = express();
const uri = "mongodb+srv://segre:Ampr859859@crud.j0x1b.mongodb.net/users?retryWrites=true&w=majority"

const UserModel = require("./modules/user");
const TokenModel = require("./modules/Tokens");

app.use(express.json());
app.use(cors())

mongoose.connect(uri, {
    useNewUrlParser: true,
});


// app.post("/number",async (req, res)=>{


//     const doc = new TokenModel({token: req.body.token});

//     try{

//         await doc.save();
//     }catch(err){ console.log(err);}
// } )

app.post('/insert', async (req, res)=>{

    const userName = req.body.userName
    const token = req.body.token

    const user = new UserModel({
        userName: userName,
        token: token,
    })
    try {
        await user.save();
    } catch(err){
        console.log(err); 
    }
})

app.post('/insertNum', async (req, res)=>{
    const token = req.body.token;

    const tok = new TokenModel({
        token: token
    })
    try{
        await tok.save();
    }catch(err){
        console.log(err);
    }
})

app.get('/read', async (req, res)=>{
    UserModel.find({}, (err, result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
})

app.get('/numbers', async (req, res)=>{
    TokenModel.find({}, (err, result)=>{
        if(err){
            res.send(err);
        }

        res.send(result);
    })
})

app.delete("/delete/:id", async (req, res)=>{
    const id = req.params.id;
    await UserModel.findByIdAndRemove(id).exec();
    res.send("deleted");
})

app.delete("/deleteNum/:id", async (req, res)=>{
    const id = req.params.id;
    await TokenModel.findByIdAndRemove(id).exec();
    res.send("deleted");
})



app.listen(process.env.PORT || 3001, ()=>{
    console.log("Server running on port 3001...");
})
