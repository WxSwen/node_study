// 多进程是复制（fork）进程，拥有独立的空间地址和数据栈，只有建立ipc通信才有进程间通信

// const http = require('http');

// http.createServer().listen(3000, () => {
//   console.log(process.pid);
// })

// 进程（Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位
// 线程是操作系统能够进行运算调度的最小单位

// 单线程使用总结
// Node.js 虽然是单线程模型，但是其基于事件驱动、异步非阻塞模式，可以应用于高并发场景，避免了线程创建、线程之间上下文切换所产生的资源开销。
// 如果你有需要大量计算，CPU 耗时的操作，开发时候要注意

// 创建新的线程和执行期上下文线程的切换开销，由于每创建一个线程就会占用一定的内存，当应用程序并发大了之后，内存将会很快耗尽

// 在单核 CPU 系统之上我们采用 单进程 + 单线程 的模式来开发。在多核 CPU 系统之上，可以用过 child_process.fork 开启多个进程（Node.js 在 v0.8 版本之后新增了Cluster 来实现多进程架构） ，即 多进程 + 单线程 模式。注意：开启多进程不是为了解决高并发，主要是解决了单进程模式下 Node.js CPU 利用率不足的情况，充分利用多核 CPU 的性能。

// 四种方式
// child_process.spawn()：适用于返回大量数据，例如图像处理，二进制数据处理。
// const spawn = require('child_process').spawn;
// const child = spawn('ls', ['-l']);

// child.stdout.pipe(process.stdout);
// console.log(process.pid, child.pid);

// child_process.exec()：适用于小量数据，maxBuffer 默认值为 200 * 1024 超出这个默认值将会导致程序崩溃，数据量过大可采用 spawn。

// const exec = require('child_process').exec;
// const child = exec('ls', '-l');

// child.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// exec('node -v', (error, stdout, stderr) => {
//   console.log(stdout);
// })
// console.log(process.pid, exec.pid);

// execFile

// fork



