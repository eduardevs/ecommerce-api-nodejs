const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// * parsing the data => form in this case
// -- as we did it before without express, this way is much easier.
// -- the body is parsed before the request treatment in the middlewares below. 
// -- extended:false = to disable options that have to be set to parse other bodies data, not default. (this case is by default for a form)
app.use(bodyParser.urlencoded({extended:false}));

app.use('/users', (req, res, next) => {
    console.log('ieqfsdq');

})

app.use('/user', (req, res, next) => {
    // ! careful, a name always have to be set it in the input, to parse data.
    res.send('<form action="/add-user" method="POST"><input type="text" placeholder="username" name="title"><input type="submit"></form>');
})

// using filtering from express
app.post('/add-user', (req, res, next) => {
    // ? we have to install body parser. and use it before this. 

    console.log(req.body);
    // we use redirect from express
    res.redirect('/');
})

app.use('/', (req, res) => {
    // console.log('ieqfsdq');
    res.send('<h1>welcome</h1>');
})

app.listen(3000);