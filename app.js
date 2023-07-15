const http = require('http');

const dummyUsers = [
    {
        name: 'Fred',
        username: 'fred@mail.fr',
        password: '12345678'
    },
    {
        name: 'Sarah',
        username: 'sarah@mail.fr',
        password: 'sarahnewman1'
    },
];

// then fake data
// https://jsonplaceholder.typicode.com/users


// step 1 create a server
const server = http.createServer((req, res) => {
    // step 2. url from req
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Welcome Page - Exercise 1</title></head>');
        res.write('<body><h1>Welcome ! - this comes from NodeJS</h1>');
        res.write('<form action="/create-user" method="POST"><input name="user" type="text" placeholder="your name here" ></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === "/users") {
        console.log('users!')
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Welcome Page - Exercise 1</title></head>');
        res.write('<body><h1>Users !</h1>');
        // res.write(`<ul><li>${dummyUsers[0].name}</li><li>${dummyUsers[1].name}</li></ul></body>`);
        res.write(`<ul>${ dummyUsers.map(user => `<li> ${user.name}</li>`)}</ul></body>`);
        res.write('</html>');
        return res.end();
        // req.setHeader('Location', '/');
        // req.redirect('/');

    }

    if (url === "/create-user" && method === "POST") {
        const body = [];
        // NAME OF THIS ?
        req.on('data', (chunk) => {
            // getting all chunk of data
            body.push(chunk);
        });
        // parse data
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const name = parsedBody.split('=')[1];

            dummyUsers.push({
                name: name,
                username: name,
                password:'1234',
            })
        })

        // console.log('test');
        // return of the status that will make the redirection
        res.statusCode = 302;
        res.setHeader('Location', '/users');
        res.end();
    }

})


server.listen(3001);