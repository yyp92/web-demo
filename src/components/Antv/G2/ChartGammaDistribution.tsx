import React from 'react'
import { Chart } from '@antv/g2';
import {randomGamma} from 'd3-random'
import {sort} from 'd3-array'
 
export const ChartGammaDistribution = () => {

    React.useEffect(() => {
        const random = (k: any, theta = 1) => randomGamma(k, theta)

        const gammaLine = (node: any, {n, color}: any) => {
            node
                .line()
                .data(new Array(1000).fill(0).map(random(n)))
                .encode('x', (d: any) => d)
                .encode('shape', 'smooth')
                .transform({type: 'binX', y: 'count'})
                .transform({type: 'sortX', ordinal: false})
                .style('lineWidth', 2)
                .style('stroke', color)
        }

        const chart = new Chart({
            container: 'container',
            theme: 'classic',
            autoFit: true
        })

        chart
            .call(gammaLine, {n: 1, color: 'steelblue'})
            .call(gammaLine, {n: 2, color: '#E3D78A'})
            .call(gammaLine, {n: 3, color: 'green'})

        chart.render()
    }, [])

    return (
        <>
            <h2>概率分布 - 伽马分布</h2>
            <div id="container" style={{
                marginTop: '30px',
                height: '500px',
            }}></div>
        </>
    )
}
