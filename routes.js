const fs = require('fs');

const requestHandler = (req, res) => {
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

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            // getting all chunk of data
            body.push(chunk);
        });
        // return because we don't want the execution of the rest
        // nodejs will pass this function at a certain point of time which is asynchronous, 
        // ? If the callback is not settled like this, the code will be paused, which is going to slow down the server.
        // *1*
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();  // we concat
            const message = parsedBody.split('=')[1];
            // update to writeFile
            // writeFileSync is blocking code that could block the rest of the execution
            // ? This code executes after the set header
            // fs.writeFileSync('message.txt', message);
            // ? nodejs has internal registry of listeners. Event registry, it will register the two handlers and move on to the new line.* that's why we add return above. *1* callback is going to be call sometime in the future. That way nodejs is always running.
            // ! writeFileSync will code until the method is executed.
            fs.writeFile('message.txt', message, err => {
                // ! we don't handle error here because is a simple process example, {this is a standard manner to do in nodejs}
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            }); // ? EVENT DRIVEN ARCHITECTURE ?: 1. nodejs say to computer system: please do something and then it will go ahead to execute the code above, (nodejs handle the heavy task like file processing with a system process which uses multithreathing) 
            
            // ? 2.then it will continue its even loop to listen for event callbacks to manage tiny actions like above to never block the code execution. Then just come back once an operation is done by the operating system.
            // ? 3.  This is why node is high performance because never blocks code and the server.
            // ? eventually, to manage a certain operation he says to the system, to that or to this, and eventually comes and do something in the callback that is not a blocking operation.
        });

    }
    // this code will be run before the 2nd callback IF we don't add a return on the end event listener above.
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Page nodejs</title></head>');
    res.write('<body><h1>HELLO HOLA SALUT</h1></body>');
    res.write('</html>');
    res.end();
}

// MODULE SYSTEM WORK
// * 1 module keyboard object, which has export property

// module.exports = requestHandler;
// we register in module.exports

// * 2. multiple exports in one file in an object
// module.exports = {
//     handler: requestHandler,
//     someText: 'some text'
// };

// * 3) third way
// module.exports.handler = requestHandler;
// module.exports.someText = 'some text different exportly';

// * 3.1 - shortcut

exports.handler = requestHandler;
exports.someText = 'some text different';