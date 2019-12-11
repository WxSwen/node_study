// tcp
// 1. 面向链接: 需要对方主机在线，并建立链接
// 2. 面向字节流: 你给我一堆字节流的数据，我给你发送出去，但是每次发送多少是我说了算，每次选出一段字节发送的时候，都会带上一个序号，这个序号就是发送的这段字节中编号最小的字节的编号。
// 3. 可靠: 保证数据有序的到达对方主机，没发送一个就会确定回复，超过时间则重试

// udp
// 1. 面向无链接：发送的时候不关心对方主机在线，可以离线发送
// 2. 面向报文：一次发送一段数据
// 3. 不可靠：无重试


// http2
// 所有数据以二进制传输
// 多路复用
// 头信息压缩及主动推送


// 三次握手 - syn -> syn + ack -> ack
// SYN(synchronous建立联机)
// ACK(acknowledgement 确认)
// Sequence number(顺序号码)


const events = require('events');
const emitter = new events.EventEmitter();

emitter.on('test', function() {
  console.log('???');
});
emitter.emit('test');
emitter.emit('test');