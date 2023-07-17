const express = require('express');
const app = express();



app.use('/users', (req, res, next) => {
    console.log('ieqfsdq');
    next();
})

//! important; not to forget indicating that middleware here only works for /users route
const dummyUsers = [
    {
        name: "Heloise"
    },
    {
        name: "Eduardo"
    }
]

app.use('/users', (req, res, next) => {
    res.send(`<h1>users</h1><ul>${dummyUsers.map(user => `<li>${user.name}</li>`)}</ul>`);
})

app.use('/', (req, res) => {
    // console.log('ieqfsdq');
    res.send('<h1>welcome</h1>');
})

app.listen(3000);