import axios from 'axios'

export const handQueue = (
    // 请求总数
    reqs: any[]
) => {
    reqs = reqs || []

    const requestQueue = (concurrency: number) => {
        // 最大并发数
        concurrency = concurrency || 6
        // 请求池
        const queue: any = []
        let current = 0

        const dequeue = () => {
            while (current < concurrency && queue.length) {
                current++
                // 出队列
                const requestPromiseFactory = queue.shift()

                requestPromiseFactory()
                    // 成功的请求逻辑
                    .then(() => {})
                    // 失败的请求逻辑
                    .catch((error: any) => {
                        console.log(error)
                    })
                    .finally(() => {
                        current--
                        dequeue()
                    })
            }
        }

        return (requestPromiseFactory: any) => {
            // 入队列
            queue.push(requestPromiseFactory)
            dequeue()
        }
    }

    const enqueue = requestQueue(6)

    for (let i = 0; i < reqs.length; i++) {
        enqueue(() => axios.get('/api/test' + i))
    }
}