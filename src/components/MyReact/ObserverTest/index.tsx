/**
 * 浏览器提供了 5 种 Observer 来监听变动
 */
import React, {useEffect, useRef} from 'react'

import './index.scss'


export const ObserverTest = () => {
    /**
     * * IntersectionObserver 
     * IntersectionObserver 可以监听一个元素和可视区域相交部分的比例，然后在可视比例达到某个阈值的时候触发回调
     */
    // useEffect(() => {
    //     const intersectionObserver = new IntersectionObserver(
    //         function (entries) {
    //             console.log('info:');
    //             entries.forEach(item => {
    //                 console.log(item.target, item.intersectionRatio)
    //             })
    //         }, {
    //         threshold: [0.5, 1]
    //     });
        
    //     intersectionObserver.observe(document.querySelector('#box1') as any);
    //     intersectionObserver.observe(document.querySelector('#box2') as any);
    // }, [])

    // return (
    //     <div>
    //         <div id="box1">BOX111</div>
    //         <div id="box2">BOX222</div>
    //     </div>
    // )



    /**
     * * MutationObserver
     * MutationObserver 可以监听对元素的属性的修改、对它的子节点的增删改
     */
    // useEffect(() => {
    //     const box = document.querySelector('#box') as any

    //     if (box) {
    //         setTimeout(() => {
    //             box.style.background = 'red';
    //         },2000);
            
    //         setTimeout(() => {
    //             const dom = document.createElement('button');
    //             dom.textContent = '东东东';
    //             box.appendChild(dom);
    //         },3000);
            
    //         setTimeout(() => {
    //            document.querySelectorAll('button')[0].remove();
    //         },5000);

    //         const mutationObserver = new MutationObserver((mutationsList) => {
    //             console.log(mutationsList)
    //         });
            
    //         mutationObserver.observe(box, {
    //             attributes: true,
    //             childList: true
    //         });
    //     }
    // }, [])

    // return (
    //     <div id="box">
    //         <button>光</button>
    //     </div>
    // )



    /**
     * * ResizeObserver
     * 元素可以用 ResizeObserver 监听大小的改变，当 width、height 被修改时会触发回调
     */
    // useEffect(() => {
    //     const box: any = document.querySelector('#box')

    //     setTimeout(() => {
    //         box.style.width = '200px'
    //     }, 3000)

    //     const resizeObserver = new ResizeObserver(entries => {
    //         console.log('当前大小', entries)
    //     })
    //     resizeObserver.observe(box)
    // }, [])

    // return (
    //     <div id="box"></div>
    // )



    /**
     * * PerformanceObserver
     * 用于监听记录 performance 数据的行为，一旦记录了就会触发回调，这样我们就可以在回调里把这些数据上报
     */
    useEffect(() => {
        const performanceObserver = new PerformanceObserver(list => {
            list.getEntries().forEach(entry => {
                // 上报
                console.log(entry);
            })
        })
    
        // 创建 PerformanceObserver 对象，监听 mark（时间点）、measure（时间段）、resource（资源加载耗时） 这三种记录时间的行为。
        performanceObserver.observe({
            entryTypes: ['resource', 'mark', 'measure']
        })
    
        performance.mark('registered-observer')
    }, [])

    const measureClick = () => {
        performance.measure('button clicked')
    }

    return (
        <>
            <button onClick={measureClick}>Measure</button>

            <img src="https://p9-passport.byteacctimg.com/img/user-avatar/4e9e751e2b32fb8afbbf559a296ccbf2~300x300.image" />
        </>
    )



    /**
     * * ReportingObserver 
     * 可以监听过时的 api、浏览器干预等报告等的打印，在回调里上报，这些是错误监听无法监听到但对了解网页运行情况很有用的数据
     */
}