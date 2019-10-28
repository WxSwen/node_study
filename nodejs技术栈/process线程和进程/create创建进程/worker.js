// 创建一个 server 对象，注意这里最开始并没有监听 3000 端口
// 通过 message 事件接收主进程 send 方法发送的消息
// 监听 uncaughtException 事件，捕获未处理的异常，发送自杀信息由主进程重建进程，子进程在链接关闭之后退出


const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/plain'
  });
  res.end(`i am worker, pid:${process.pid}, ppid:${process.ppid}`);
  throw new Error('worker process exception!');
});
let worker;
process.on('message', (message, sendHandle) => {
  // 当父子进程之间建立 IPC 通道之后，通过子进程对象的 send 方法发送消息，
  // 第二个参数 sendHandle 就是句柄，可以是 TCP套接字、TCP服务器、UDP套接字等，
  // 为了解决上面多进程端口占用问题，我们将主进程的 socket 传递到子进程，修改代码，如下所示：
  if (message === 'server') {
    worker = sendHandle;
    worker.on('connection', function(socket) {
      console.log(socket);
      server.emit('connection', socket);
    });
  }
});

process.on('uncaughtException', function(err) {
  console.log(err);

  process.send({ act: 'suicide' });
  worker.close(function() {
    process.exit(1);
  });
});

