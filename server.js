const express  = require('express');
const hbs = require('hbs');
const fs = require('fs');


let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public')); 


//This is example of middleware
app.use((req,res,next)=>{
    var log = `${new Date().toString()} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log(err);
        }
    });
    next(); // This is mandatory as it tells middleware is done with its work, or else none of the below code will be executed
});


//Another Example of middleware when site is under maintenance
app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});



//This is a function can be called from anywhere(partials,other pages) 
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});    

//Another Helper Example
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('home.hbs');
});

app.get('/about',(req,res)=>{
    res.render('about.hbs');
});


app.listen(3000,()=>{
    console.log("Server is up on 3000");
});