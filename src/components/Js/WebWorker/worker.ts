import React from 'react';
// self.importScripts('./test.ts')

// * Web Worker 的执行上下文名称是 self，无法调用主线程的 window 对象的
// self 代表子线程自身，即子线程的全局对象
// self.addEventListener("message", function (e) {
//     // e.data 表示主线程发送过来的数据

//     // * 向主线程发送消息
//     self.postMessage("worker线程收到的：" + e.data); 

//     // * 测试 worker 引入第三方的ts脚本
//     // self.postMessage("worker线程收到的：" + e.data + aa); 
// });


// 计算
function calc(num: any) {
    let result = 0
    let startTime = performance.now()
    // 计算求和（模拟复杂计算）
    for (let i = 0; i <= num; i++) {
        result += i
    }
    
    // 由于是同步计算，在没计算完成之前下面的代码都无法执行
    const time = performance.now() - startTime
    console.log('总计算花费时间:', time)
    self.postMessage(result)
}
self.onmessage = function (e) {
    calc(e.data)
}