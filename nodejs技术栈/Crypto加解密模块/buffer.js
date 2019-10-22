// Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互

// Buffer.alloc
// 返回一个已初始化的 Buffer，可以保证新创建的 Buffer 永远不会包含旧数据。

// const a = Buffer.from('1');
// const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

// const buf = Buffer.from([1,4,7,9]);
// console.log(buf);

// const alloc = Buffer.alloc(10);
// console.log(alloc);
// alloc[0] = 12;
// console.log(alloc);


// buf 互转
// const buf = Buffer.from('Node.js 技术栈', 'UTF-8');

// const buf1 = buf.toString('utf-8', 0, buf.length);

// console.log(buf);
// console.log(buf1);


// 由于 Buffer 需要处理的是大量的二进制数据，假如用一点就向系统去申请，则会造成频繁的向系统申请内存调用，
// 所以 Buffer 所占用的内存不再由 V8 分配，而是在 Node.js 的 C++ 层面完成申请，在 JavaScript 中进行内存分配。因此，这部分内存我们称之为堆外内存
// Node.js 采用了 slab 机制进行预先申请、事后分配，是一种动态的管理机制
// Node.js 以 8KB 为界限来区分是小对象还是大对象

// 使用 Buffer.alloc(size) 传入一个指定的 size 就会申请一块固定大小的内存区域，slab 具有如下三种状态：

// full：完全分配状态
// partial：部分分配状态
// empty：没有被分配状态
// Buffer 在创建时大小已经被确定且是无法调整的

// console.log(Buffer.alloc(2 * 1024));

// function allocate(size) {
//   if (size <= 0) {
//     return new FastBuffer();
//   }

//   if (size < (Buffer.poolSize >>> 1)) {
//     if (size > (poolSize - poolOffset)) {
//       createPool();
//       var b = new FastBuffer(allocPool, poolOffset, size);
//       poolOffset += size;
//       alignPool();
//       return b;
//     }
//   } else {
//     // 向c++层面申请
//     return createUnsafeBuffer(size);
//   }
// }

// 在初次加载时就会初始化 1 个 8KB 的内存空间，buffer.js 源码有体现
// 根据申请的内存大小分为 小 Buffer 对象 和 大 Buffer 对象
// 小 Buffer 情况，会继续判断这个 slab 空间是否足够
// 如果空间足够就去使用剩余空间同时更新 slab 分配状态，偏移量会增加
// 如果空间不足，slab 空间不足，就会去创建一个新的 slab 空间用来分配
// 大 Buffer 情况，则会直接走 createUnsafeBuffer(size) 函数
// 不论是小 Buffer 对象还是大 Buffer 对象，内存分配是在 C++ 层面完成，内存管理在 JavaScript 层面，最终还是可以被 V8 的垃圾回收标记所回收。


// 场景
// I/O 操作
// 在 Stream 中我们是不需要手动去创建自己的缓冲区，在 Node.js 的流中将会自动创建。

// zlib.js

// 加解密



// 缓冲（Buffer）

// 缓冲（Buffer）是用于处理二进制流数据，将数据缓冲起来，它是临时性的，对于流式数据，会采用缓冲区将数据临时存储起来，等缓冲到一定的大小之后在存入硬盘中。
// 视频播放器就是一个经典的例子，有时你会看到一个缓冲的图标，这意味着此时这一组缓冲区并未填满，当数据到达填满缓冲区并且被处理之后，此时缓冲图标消失，你可以看到一些图像数据。


