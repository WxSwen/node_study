// cipher 对称加密

// cipher类 
// Cipher 类的实例用于加密数据。 该类可以通过以下两种方式之一使用：

// 作为可读写的流，其中写入未加密的数据以在可读侧生成加密的数据。
// 使用 cipher.update() 和 cipher.final() 方法生成加密的数据。

// cipher 类 加密后 返回: <Buffer> | <string>


// buffer类
// 在引入 TypedArray 之前，JavaScript 语言没有用于读取或操作二进制数据流的机制。 
// Buffer 类是作为 Node.js API 的一部分引入的，用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。
// 现在可以使用 TypedArray， Buffer 类以更优化和更适合 Node.js 的方式实现了 Uint8Array API。
// Buffer 类的实例类似于从 0 到 255 之间的整数数组（其他整数会通过 ＆ 255 操作强制转换到此范围），
// 但对应于 V8 堆外部的固定大小的原始内存分配。 Buffer 的大小在创建时确定，且无法更改。

// 前端中：
// 与 WebGL 项目有关。所谓 WebGL，就是指浏览器与显卡之间的通信接口，为了满足 JavaScript 与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。
// 文本格式传递一个 32 位整数，两端的 JavaScript 脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，可以像 C 语言那样，直接操作字节，将 4 个字节的 32 位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升


// arraybuffer 考虑溢出情况
// 正向溢出（overflow）：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加上余值，再减去 1。
// 负向溢出（underflow）：当输入值小于当前数据类型的最小值，结果等于当前数据类型的最大值减去余值的绝对值，再加上 1。
// 是否溢出 -> 超出位数，只会保留对应后位 -> 正向/反向溢出计算

// 使用场景
// ajax  responseType：‘arraybuffer’
// canvas 
// socket socket.binaryType = 'arraybuffer';
// Fetch API 取回的数据，就是ArrayBuffer对象。

// file 
// const file = fileInput.files[0];
// const reader = new FileReader();
// reader.readAsArrayBuffer(file);

// Web worker

function cipher(str) {
  try {
    const crypto = require('crypto');
    // defaults to 16 bytes
    const cipher = crypto.createCipheriv('des-ecb', '12345678', '');

    let encrypted = cipher.update(str, 'utf8', 'hex');
    console.log(encrypted); // 28dba02eb5f6dd479a6144f98622a55c
    // outputEncoding <string> 返回值的字符编码。
    // 一旦 cipher.final() 方法被调用， Cipher 对象就不能再用于加密数据。 如果试图再次调用 cipher.final()，将会抛出一个错误。
    encrypted += cipher.final('hex');

    return encrypted;
  } catch(e) {
    console.log('error');
    return e.message || e;
  }
}
// console.log(cipher('hello world ！！！'));
// 28dba02eb5f6dd479a6144f98622a55caa67f06240f93005




function decipher(encrypted) {
  try {
    const crypto = require('crypto');

    const decipher = crypto.createCipheriv('des-ecb', '12345678', '');

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch(e) {
    console.log('解密失败');

    return e.message || e;
  }
}
// console.log(decipher('28dba02eb5f6dd479a6144f98622a55caa67f06240f93005'));


// md5类
// 是让大容量信息在数字签名软件签署私人秘钥前被 “压缩” 成一种保密格式，也就是把一个任意长度的字节串变换成一定长度的十六进制数字串（32个字符） 一致性验证

// 特点
// 不可逆
// 输入两个不同的明文不会得到相同的输出值
// 根据输出值，不能得到原始的明文，即过程不可逆

const crypto = require('crypto');
const md5 = str => {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex');
};

console.log(md5('123456789'));

console.log(md5('123456789').toUpperCase());