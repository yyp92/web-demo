import React from 'react'
import { Chart } from '@antv/g2';

export const ChartLogarithmDistribution = () => {
    React.useEffect(() => {
        const linspace = (start: number, end: number, sample: number) => {
            return new Array(sample + 1)
                .fill(0)
                .map((item: any, index: number) => {
                    return start + (end - start) / sample * index
                })
        }

        const x = linspace(0, 5, 500)
        const y = (mu: any, sigma: any) => (x: any) => {
            return 1 / (x * sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-Math.pow(Math.log(x) - mu, 2) / (2 * Math.pow(sigma, 2)))
        }

        const line = (node: any, {mu, sigma, color}: any) => {
            node
                .line()
                .data(x)
                .encode('x', (d: any) => d)
                .encode('y', y(mu, sigma))
                .encode('shape', 'smooth')
                .scale('x', {domain: [0, 5]})
                .style('lineWidth', 2)
                .style('stroke', color)
        }

        const chart = new Chart({
            container: 'container',
            theme: 'classic',
            autoFit: true
        })

        chart
            .call(line, {mu: 0, sigma: 1, color: 'steelblue'})
            .call(line, {mu: 0, sigma: 0.5, color: '#E3D78A'})
            .call(line, {mu: 1, sigma: 1.5, color: 'green'})

        chart.render()
    }, [])

    return (
        <>
            <h2>概率分布 - 对数正态分布</h2>
            <div id="container" style={{
                marginTop: '30px',
                height: '500px',
            }}></div>
        </>
    )
}
