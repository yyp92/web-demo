/**
 * 数据推送
 * 
 * 后端代码：nestjs-source-code/sse-test
 */
import {useEffect} from 'react'

export const SseTestFrontend = () => {
    useEffect(() => {
        // 这个 EventSource 是浏览器原生 api，就是用来获取 sse 接口的响应的，它会把每次消息传入 onmessage 的回调函数
        // const eventSource = new EventSource('http://localhost:3000/stream');
        // const eventSource = new EventSource('http://localhost:3000/stream2');
        const eventSource = new EventSource('http://localhost:3000/stream3');

        eventSource.onmessage = ({ data }) => {
            console.log('New message', JSON.parse(data));
        };
    }, []);

    return (
        <div>hello</div>
    );
}
