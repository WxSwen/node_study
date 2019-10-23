const http = require('http');
const fork = require('child_process').fork;

http.createServer((req, res) => {
  if (req.url === '/compute') {
    let compute = fork(__dirname + '/fork_compute.js');
    compute.on('message', (msg) => {
      console.log(msg);
    });
    compute.send('haha');
  } else {
    res.end('no fork');
  }
}).listen('3000', () => {
  console.log('listening');
})