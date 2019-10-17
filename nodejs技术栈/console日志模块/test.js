const fs = require('fs');
const path = require('path');
// const output = fs.createWriteStream(path.join(__dirname, './stdout.txt'));
// const errorOutput = fs.createWriteStream(path.join(__dirname, './stderr.txt'));
const logger = require('./logger');

// const logger = Logger(output, errorOutput);
logger.info('hello world!!!!!!');

setTimeout(() => {
  logger.clear();
}, 5000);

// logger.error('错误日志记录');
// logger.trace('测试错误');

// logger.time('测试');
// for(let i=0; i < 10000; i++){}
// logger.timeEnd('测试');

// console.log() 和 console.error() 内部分别是由它们实现的。
// 写操作是否为同步，取决于连接的是什么流以及操作系统是 Windows 还是 POSIX :

// 文件：在 Windows 和 POSIX 上是同步的。
// TTY（终端）：在 Windows 上是异步的，在 POSIX 上是同步的。
// 管道（和 socket）：在 Windows 上是同步的，在 POSIX 上是异步的。
// 同步写避免了调用 console.log() 或 console.error() 产生不符合预期的交错输出问题，
// 或是在异步写完成前调用了process.exit()导致未写完整。 查看process.exit() 获取更多信息。

// nodejs有关异步请求
// http 请求、数据库请求等 IO 请求操作
// net.Server.listen() 或者 http.Server.listen() 等端口监听
// fs.write() 类型的文件 IO 操作
// console.log() 输出日志
// setTimeout()、setInterval() 等定时器操作
// process.send() 等异步请求发送


// 硬退出 signal 的方式: kill -9, 内部：process.exit(0)
// 软退出 kill -15, 需要保证除了server外的一切异步还在进行
// 比如： 
// 此时进程不应该继续对外提供服务了，比如 Node.js 中的 http, net 等 listen 状态的 server 应该 close 了，否则此时有请求进来，可能执行到一半进程就直接 exit 导致提供了不可用的服务。
// 有些数据库的锁、共享内存等公共资源需要释放。如果没有注意释放可能会有一些未期望/未定义的边缘 case 出现。
// 常规的运维过程中输出各项自检/调试的日志（直接 process.exit() 可能啥记录都没有了）

// 查看存在pending进程
// process._getActiveHandles()
// process._getActiveRequests()