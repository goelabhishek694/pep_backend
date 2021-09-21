const express=require('express');

const app=express();
// const router=express.Router();
app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());
// app.use((req,res,next)=>{
//     //do some work
//     console.log('i am a middleware');
//     next();
// });

app.use(express.static('public'));
const userRouter=require('./Routers/userRouter');
const authRouter=require('./Routers/authRouter');

app.use('/user',userRouter);
app.use('/auth',authRouter);
//mounting in express

//param route
// app.get('/user/:id',getUserById);


// app.use((req,res,next)=>{
//     //do some work
//     console.log('i am a middleware 2nd time');
//     next();
// });





//redirects
// app.get('/user-all',(req,res)=>{
//     res.redirect('/user');
// });

// //404 page
// app.use((req,res)=>{
//     res.sendFile('public/404.html',{root:__dirname})
// });

// let user=[];
// client <- server
//crud- create read update delete
//read
// app.get('/',(req,res)=>{
//     res.send('Home Page');
// });

// app.get('/user',getUser);












