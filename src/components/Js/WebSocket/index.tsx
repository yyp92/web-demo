import {useEffect, useRef, useState, useCallback, useLayoutEffect} from 'react'
import {Button, Input} from 'antd'

export const WebSocketCom = () => {
    const ws = useRef<WebSocket | null>(null);
    const [sendMessage1, setSendMessage1] = useState<string>('');
    const [sendMessage2, setSendMessage2] = useState<string>('');
    const [message, setMessage] = useState<string[]>([]);

    const handleMessage = useCallback((data: string) => {
        message.push(data)
        setMessage([...message])
    }, [message])

    const webSocketInit = () => {
        // 创建 WebSocket 对象
        // 使用一个 WebSocket 服务器进行测试
        // * 需要去github nodejs-websocket 中启动，node ./src/index.js
        ws.current = new WebSocket('ws://127.0.0.1:8080'); 

        if (ws.current) {
            // 设置 WebSocket 连接打开时的回调函数
            ws.current.onopen = function() {
                console.log('WebSocket 连接已打开');
            };

            // 设置 WebSocket 接收到消息时的回调函数
            ws.current.onmessage = function(event) {
                console.log('WebSocket 接收到消息:', event.data);

                handleMessage(event.data)
            };

            // 设置 WebSocket 发生错误时的回调函数
            ws.current.onerror = function(e) {
                console.log('WebSocket 发生错误', e);
            };

            // 设置 WebSocket 连接关闭时的回调函数
            ws.current.onclose = function() {
                console.log('WebSocket 连接已关闭');
            };
        } 
    };

    /**
     * 初始化 WebSocket
     * 且使用 WebSocket 原声方法获取信息
     */
    useEffect(() => {
        webSocketInit();

        return () => {
            // ws.current?.close();
        };
    }, []);


    // ********* 操作 ********
    const handleSend1 = () => {
        if (ws.current) {
            ws.current.send(sendMessage1);
        }
    }

    const handleSend2 = () => {
        if (ws.current) {
            ws.current.send(sendMessage2);
        }
    }


    // ********* 渲染 ********
    return (
        <div>
            <h2>WebSocket</h2>

            <div
                style={{
                    marginTop: 20,
                    display: 'flex',
                }}
            >
                <Input
                    value={sendMessage1}
                    onChange={(e) => {
                        setSendMessage1(e?.target?.value)
                    }}
                    allowClear
                />

                <Button
                    style={{marginRight: 10, marginLeft: 10}}
                    type="primary"
                    onClick={handleSend1}
                >发送消息</Button>
            </div>

            <div
                style={{
                    marginTop: 20,
                    display: 'flex',
                }}
            >
                <Input
                    value={sendMessage2}
                    onChange={(e) => {
                        setSendMessage2(e?.target?.value)
                    }}
                    allowClear
                />

                <Button
                    style={{marginRight: 10, marginLeft: 10}}
                    type="primary"
                    onClick={handleSend2}
                >发送消息</Button>
            </div>

            <div style={{
                marginTop: 20,
                padding: 20,
                border: '1px solid #ccc'
            }}>
                {
                    message.map((item: any, index: number) => {
                        return (
                            <div>
                                <span>{index % 2 === 0 ? '返回信息1' : '返回信息2'}</span>
                                <span style={{marginLeft: 10}}>{item}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}