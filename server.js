const express=require('express');
const app=express();

app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());


let user={};
// client <- server
//crud- create read update delete
//read
app.get('/',(req,res)=>{
    res.send('Home Page');
});

app.get('/user',(req,res)=>{
    res.json(user);
});

//post request
// client-> server 
//create
app.post('/user',(req,res)=>{
    user=req.body;
    // console.log(req.body);
    res.send('data has been added succesfully');
});
//update
app.patch('/user',(req,res)=>{
    let obj=req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    res.json(user);
});
//delete 
app.delete('/user',(req,res)=>{
    user={};
    res.json(user);
    // res.send('ussr has been deleted');
})
//param route
app.get('/user/:id',(req,res)=>{
    console.log(req.params);
    res.json(req.params.id);
});




