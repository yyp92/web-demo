import React from 'react'
import { Chart } from '@antv/g2';
 
export const ChartExponentDistribution = () => {

    React.useEffect(() => {
        const linspace = (start: number, end: number, sample: number) => {
            return new Array(sample + 1)
                .fill(0)
                .map((item: any, index: number) => {
                    return start + (end - start) / sample * index
                })
        }
        const x = linspace(0, 5, 1000)
        // 指数分布公式
        const y = (lamda = 1) => (x: any) => {
            return lamda * Math.exp(-lamda * x)
        }

        const chart = new Chart({
            container: 'container',
            theme: 'classic',
            autoFit: true
        })

        chart
            .line()
            .data(x)
            .encode('x', (d: any) => d)
            .encode('y', y())
            .encode('shape', 'smooth')
            .style('lineWidth', 2)
            .style('stroke', 'steelblue')

        chart.render()
    }, [])

    return (
        <>
            <h2>概率分布 - 指数分布</h2>
            <div id="container" style={{
                marginTop: '30px',
                height: '500px',
            }}></div>
        </>
    )
}
