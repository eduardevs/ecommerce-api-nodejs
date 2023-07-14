// server
// global module
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    // SETTING URL
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Page</title></head>');
        res.write('<body><h1>Hola mundo!</h1><form action="/message" method="POST"><input type="text" name="message"></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST') {
        //2. to be able to interact with the chunk we create a body variable 
           const body = [];
        // 1.here listener receives a chunk of data
            req.on('data', (chunk) => {
                // console.log(chunk);
                // we push a new element into the body
                body.push(chunk);
            });
        
        // 4 we can now rely on all the chunks being read in and they're store in the body
            req.on('end', () => {
        // 5 to interact with them, we use Buffer
                const parsedBody = Buffer.concat(body).toString();  // we concat
                // console.log(parsedBody);
                const message = parsedBody.split('=')[1];
                fs.writeFileSync('message.txt', message);
            });

            // sending redirection code and redirecting header.
            res.statusCode = 302;
            res.setHeader('Location', '/');
        }
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Page nodejs</title></head>');
        res.write('<body></body>');
        res.write('</html>');
        res.end();
    // ! RETURN NOT TO RETURN res.end, but to stop the execution of the code.

})

server.listen(3000);
// browser in http://localhost:3000/, we will log the req object received.
// one thread, single javascript thread. It's running one thread.

// register one function, that should be executed once is done, nodejs uses single thread javascript
//executes code when certain event occur. It's always available. THE NODE LIFECYCLE & EVENT LOOP