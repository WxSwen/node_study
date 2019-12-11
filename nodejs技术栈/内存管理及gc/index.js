// process.memoryUsage();

// rss: RAM中保存的进程占用的内存部分
// heapTotal: 堆中申请到的内存量
// heapUsed: 堆中用到的内存量，判断内存泄漏
// external: c++对象占用的内存


// 64位1.4g，32位0.7g内存 - 新生代/老生代

// 新生代 - scavenge清除算法： 适合少量内存的gc
// 老生代 - Mark-Sweep（标记清除）   产生内存碎片
//       - Mark-Compact（标记整理） 

// 回收造成stop the world,因此成本昂贵



