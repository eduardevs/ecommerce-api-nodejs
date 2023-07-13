console.log('hola');
// 1) built-in functionalities nodejs : file system functionality -> (to work and write in a file)
const fs = require('fs');
fs.writeFileSync('hello.txt', 'hola desde nodejs'); // hello.txt will contain hola desde nodejs

