// 创建一个 server 并监听 3000 端口。
// 根据系统 cpus 开启多个子进程
// 通过子进程对象的 send 方法发送消息到子进程进行通信
// 在主进程中监听了子进程的变化，如果是自杀信号重新启动一个工作进程。
// 主进程在监听到退出消息的时候，先退出子进程在退出主进程

// SIGTERM是不带参数时kill发送的信号，意思是要进程终止运行，但执行与否还得看进程是否支持。但是SIGKILL信号不同，它可以被捕获和解释（或忽略）的过程。
// SIGKILL是发送到处理的信号以使其立即终止。当发送到程序，SIGKILL使其立即终止。在对比SIGTERM和SIGINT，这个信号不能被捕获或忽略，并且在接收过程中不能执行任何清理在接收到该信号。
// SIGINT中断信号，终端在用户按下CTRL+C发送到前台进程。默认行为是终止进程，但它可以捕获或忽略。
// SIGQUIT是其控制终端发送到进程，当用户请求的过程中执行核心转储的信号。 SIGQUIT通常可以ctrl+/。它可以被捕获和解释（或忽略）。

// const fork = require('child_process').fork;
// const cpus = require('os').cpus();
// const server = require('net').createServer();

// server.listen(3000);
// process.title = 'node-master';

// const workers = {};
// const createWorker = () => {
//   const worker = fork(__dirname + '/worker.js')
//   worker.on('message', function (message) {
//       if (message.act === 'suicide') {
//           createWorker();
//       }
//   })
//   worker.on('exit', function(code, signal) {
//       console.log('worker process exited, code: %s signal: %s', code, signal);
//       delete workers[worker.pid];
//   });
//   worker.send('server', server);
//   workers[worker.pid] = worker;
//   console.log('worker process created, pid: %s ppid: %s title: %s', worker.pid, process.pid, worker.title);
// }

// for(let i = 0;i < cpus.length; i++) {
//   createWorker();
// };

// for (let i=0; i<cpus.length; i++) {
//   createWorker();
// }

// process.once('SIGINT', close.bind(this, 'SIGINT')); // kill(2) Ctrl-C
// process.once('SIGQUIT', close.bind(this, 'SIGQUIT')); // kill(3) Ctrl-\
// process.once('SIGTERM', close.bind(this, 'SIGTERM')); // kill(15) default
// process.once('exit', close.bind(this));

// function close (code) {
//   if (code !== 0) {
//       for (let pid in workers) {
//           console.log('master process exited, kill worker pid: ', pid);
//           workers[pid].kill('SIGINT');
//       }
//   }
//   process.exit(0);
// }


const fork = require('child_process').fork;
const cpus = require('os').cpus();

const server = require('net').createServer();
server.listen(3000);

const workers = {};
function createWorker() {
  let worker = fork(__dirname + '/worker.js');

  worker.on('message', (message) => {
    if (message.act === 'suicide') {
      createWorker();
    }
  });

  worker.on('exit', (code, signal) => {
    console.log('worker process exited, code: %s signal: %s', code, signal);
    delete workers[worker.pid];
  });

  worker.send('server', server);
  workers[worker.pid] = worker;
  console.log(`worker is created, pid:${worker.pid} ppid:${process.pid}`);
}

for(let i = 0; i < cpus.length; i++) {
  createWorker();
}

process.on('SIGQUIT', close.bind(this, 'SIGQUIT'));
process.on('SIGINT', close.bind(this, 'SIGINT'));
process.on('SIGTERM', close.bind(this, 'SIGTERM'));
process.on('exit', close.bind(this));

function close(code) {
  if (code !== 0) {
    for(let pid in workers) {
      console.log('master worker kill');
      workers[pid].kill('SIGINT');
    }
  }
  process.exit(0);
}
