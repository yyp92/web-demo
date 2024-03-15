import {useEffect, useState} from 'react'
import {Input, Button} from 'antd'

export const WebWorker = () => {
    const [num, setNum] = useState<number | undefined>(undefined)
    const [result, setResult] = useState<number>(0)
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<string>('')

    useEffect(() => {
        // 主线程下创建 worker 线程
        // const worker = new Worker(new URL('worker.ts', import.meta.url))

        // // 监听接收 worker 线程发的消息
        // worker.onmessage = function (e) {
        //     console.log('主线程收到worker线程消息：', e.data)
        // }

        // // 向 worker 线程发送消息
        // worker.postMessage('主线程发送hello world')
    }, [])


    // ********* 操作 *********
    const handleCalc = () => {
        let result = 0
        let startTime = performance.now()

        // 计算求和（模拟复杂计算）
        for (let i = 0; i <= (num as number); i++) {
            result += i
        }

        // 由于是同步计算，在没计算完成之前下面的代码都无法执行
        const time = performance.now() - startTime
        console.log('总计算花费时间:', time)
        setResult(result)
    }

    const handleCalc1 = () => {
        // todo 暂时注释 - 测试的时候再打开
        // const worker = new Worker(new URL('worker.ts', import.meta.url))

        // worker.postMessage(num)

        // worker.onmessage = function (e) {
        //     setResult(e.data)

        //     // 关闭 worker
        //     worker.terminate()
        // }
    }
    
    


    // ********** 渲染 *********
    return (
        <div>
            <h2>WebWorker</h2>


            <h3
                style={{marginTop: 20}} 
            >计算从 1 到给定数值的总和</h3>  

            <Input
                style={{width: 300, marginRight: 10}}
                placeholder="请输入数字"
                value={num}
                onChange={(e: any) => setNum(e?.target?.value)}
            />

            <Button
                style={{marginRight: 10}}
                type="primary"
                onClick={handleCalc}
            >开始计算</Button>

             <Button
                type="primary"
                onClick={handleCalc1}
            >开始计算-worker</Button>

            <div>计算结果为：{result}</div>


            <h3
                style={{marginTop: 20}} 
            >在计算期间你可以填XX表单</h3>

            <Input
                style={{width: 300, marginRight: 10}}
                placeholder="请输入姓名"
                value={name}
                onChange={(e: any) => setName(e?.target?.value)}
            />

            <Input
                style={{width: 300}}
                placeholder="请输入年龄"
                value={age}
                onChange={(e: any) => setAge(e?.target?.value)}
            />
        </div>
    )
}