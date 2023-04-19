import React from 'react'
import { Chart } from '@antv/g2';

export const ChartGaussianDistribution = () => {
    React.useEffect(() => {
        const chart = new Chart({
            container: 'container',
            theme: 'classic',
            autoFit: true
        })

        const u = 0
        const sigma = Math.sqrt(1)
        const r = [u - 3 * sigma, u + 3 * sigma]

        const sample = 100
        const x = new Array(sample + 1)
            .fill(0)
            .map((item: any, index: number) => {
                return r[0] + (r[1] - r[0]) / sample * index
            })

        // 正态分布
        /**
         * Math.sqrt 函数返回一个数的平方根
         * Math.pow 函数返回基数（base）的指数（exponent）次幂，即 base^exponent
         * Math.exp  函数返回 e^x
         */
        const y = (x: any) => {
            return 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * Math.pow((x - u) / sigma, 2))
        }

        chart
            .area()
            .data(x)
            .encode('x', (d: any) => d)
            .encode('y', y)
            .encode('shape', 'smooth')
            .style('fillOpacity', 0.4)

        chart
            .line()
            .data(x)
            .encode('x', (d: any) => d)
            .encode('y', y)
            .encode('shape', 'smooth')
            .style('lineWidth', 2)

        chart.render()
    }, [])

    return (
        <>
            <h2>概率分布 - 高斯分布</h2>
            <div id="container" style={{
                marginTop: '30px',
                height: '500px',
            }}></div>
        </>
    )
}
