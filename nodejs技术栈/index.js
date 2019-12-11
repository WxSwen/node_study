// 利用X-Forwarded-For伪造客户端IP漏洞成因及防范

// 一般tcp链接都有remoteAddress属性，http可以获取request.socket.remoteAddress
// 做代理或者负载均衡时我们通过 remoteAddress 获取到的就是代理服务器的 IP 而不是用户的真实 IP
// 就是所有的反向代理都实现一个统一的约定，在转发请求给下游服务之前，把请求代理的 IP 地址写入到 X-Forwarded-For 头中，形成了一个 IP 地址列：
// 1X-Forwarded-For: client, proxy1, proxy2
// X-Forwarded-For
// 首先从HTTP头中获取X-Forwarded-For，如果X-Forwarded-For头存在就按逗号分隔取最左边第一个IP地址，不存在直接通过request.getRemoteAddr()获取IP地址：
// function getClientIp(req) {
//   let xff = req['X-Forwarded-For'];
//   if (xff) {
//     return xff.indexOf(',') !== -1 ? xff.split(',')[0] : xff;
//   } else {
//     return req['remoteAdress'];
//   }
// }
// 防止伪造
//1. 反向代理（Nginx）用 $remote_addr 来识别出真实的IP地址
//2. Egg.js 可通过设置maxProxyCount指定代理层数（maxProxyCount指自己部署的服务器数量）
// 然后取X-Forwarded-For头中从右往左数第maxProxyCount个IP即为真实 IP 地址，
// 如果有伪造 IP 地址了必然在最左边，就会被忽略掉。

