const express=require('express');
const app=express();

app.listen('5000',function(){
    console.log('server listening on port 5000');
});

let user={};

app.get('/',(req,res)=>{
    res.send('Home Page');
});

app.get('/user',(req,res)=>{
    res.json(user);
});