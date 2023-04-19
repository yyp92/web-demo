import React from 'react'
import { Chart } from '@antv/g2';

// 概率分布 - 均匀分布 - 例子
export const ChartEvenDistribution = () => {
    React.useEffect(() => {
        // Step 1: 初始化图表实例
        const chart = new Chart({
            container: 'container',
            theme: 'classic',
            autoFit: true,
        })

        const sapme = 10000
        const category = 6

        const data = new Array(sapme)
            .fill(0)
            .map(() => {
                return Math.floor(Math.random() * category)
            })
    
        // Step 2: 声明可视化
        chart
            // 创建一个 Interval 标记
            .interval()
            // 绑定数据
            .data(data)
            // 编码 x 通道
            .encode('x', (d: any) => d)
            .transform({type: 'groupX', y: 'count'})
            .axis('y', {labelFormatter: '~s'})
            

        // Step 4: 渲染可视化
        chart.render()
    }, [])
    

    return (
        <>
            <h2>概率分布 - 均匀分布</h2>
            <div id="container" style={{
                marginTop: '30px',
                height: '500px',
            }}></div>
        </>
    )
}