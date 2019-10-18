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

function cipher(str) {
  try {
    const crypto = require('crypto');
    const cipher = crypto.createCipheriv('des-ecb', '123456');

    let encrypted = cipher.update(str, 'utf8', 'hex');
    console.log(cipher.final('hex'));
    encrypted += cipher.final('hex');

    return encrypted;
  } catch(e) {
    console.log('error');
    return e.message || e;
  }
}