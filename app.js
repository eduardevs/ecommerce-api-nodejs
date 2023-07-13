// server
// global module
const http = require('http');

// function exampleListener(req, res) {

// }

// http.createServer(exampleListener);

// 2. Anonymous function: event driven pattern.


// http.createServer(function(req, res) {
    
// })
// next gen js syntax
// - we  have to save it in a variable for listen 
const server = http.createServer((req, res) => {
    console.log(req);
    // this will quit process, once the function is executed
    // process.exit();
})

// by default is port 80
// -- before running the app.js nothing happen, now in the terminal, ongoing looping process listening for requests.
server.listen(3000);
// browser in http://localhost:3000/, we will log the req object received.
// one thread, single javascript thread. It's running one thread.

// register one function, that should be executed once is done, nodejs uses single thread javascript
//executes code when certain event occur. It's always available. THE NODE LIFECYCLE & EVENT LOOP