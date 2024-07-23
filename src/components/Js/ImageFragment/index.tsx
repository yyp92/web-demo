import React, {useEffect, useRef, useState} from 'react'
import { Button } from 'antd'

import s from './index.module.scss'

export const ImageFragment = () => {
    const imgRef = useRef<any>(null)
    const [type, setType] = useState<string>('1')
    const [, update] = useState<number>(0)

    useEffect(() => {
        if (imgRef.current) {
            handleCreateSmallBox(type)
        }
    }, [imgRef.current, type])

    const handleCreateSmallBox = (type: string) => {
        const box = imgRef.current
        const { width, height } = box.getBoundingClientRect()

        // 移除所有的子元素
        box.replaceChildren();

        // 定义多少个小块，由多少行和列决定
        const row = 14
        const col = 10
        // 计算小块的宽高
        const smallBoxWidth = width / col
        const smallBoxHeight = height / row

        /** @name 创建小块 **/  
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                const smallBox = document.createElement('div')
                smallBox.classList.add(s.smallBox)
                smallBox.style.width = smallBoxWidth + 'px'
                smallBox.style.height = smallBoxHeight + 'px'
                // smallBox.style.border = '1px solid red'

                // 设置背景偏移量，让小块的背景显示对应图片的位置，和以前那种精灵图一样
                const offsetX = j * smallBoxWidth * -1
                const offsetY = i * smallBoxHeight * -1;
                smallBox.style.backgroundPosition = `${offsetX}px ${offsetY}px`
                smallBox.style.backgroundSize = `${width}px ${height}px`

                // 给每个小块增加不同的延时，让动画不同时间执行
                // 延迟时间为毫秒(ms)，注意不要太小了

                let delay = 0

                if (type === '1') {
                    // * 从上到下
                    delay = i * 100
                }
                else if (type === '2') {
                    // * 从左到右
                    delay = j * 100
                }
                else if (type === '3') {
                    // * 从左上角到右下角：
                    delay = (i + j) * 100;
                }
                else if (type === '4') {
                    // * 从右下角到左上角：
                    delay = -(i + j) * 100;
                }
                else if (type === '5') {
                    // * 右上角到左下角
                    delay = (i - j) * 100;
                }
                else if (type === '6') {
                    // * 左下角到右上角
                    delay = (j - i) * 100;
                }
                else if (type === '7') {
                    // * 随机
                    const getRandom = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
                    delay = getRandom(0, col + row) * 100
                }
                else if (type === '8') {
                    // * 从中心向四周扩散
                    /**
                     * Math.abs(col / 2 - j)： 返回从方阵的中央列到当前列 j 的水平距离，忽略方向。这个距离随着 j 的值从 0 增加到 col-1 先减小后增加。
                     * Math.abs(row / 2 - i)：返回从方阵的中央行到当前行 i 的垂直距离，忽略方向。这个距离随着 i 的值从 0 增加到 row-1 先减小后增加。
                     * (Math.abs(col / 2 - j) + Math.abs(row / 2 - i))：这部分代码计算当前元素 (i, j) 到方阵中心的总距离（水平距离和垂直距离的和），这种距离的计算方式确保了元素无论在方阵中的哪个位置，它到中心的距离总是一个非负整数。
                     * (Math.abs(col / 2 - j) + Math.abs(row / 2 - i))) * 100：
                     * 最后，将总距离乘以 100 得到延迟时间（以毫秒为单位）。这里的 100 是一个缩放因子，用来确保延迟时间足够长，以便在视觉上能够被观察到。延迟时间与总距离成正比，距离方阵中心越远的元素，其显示的延迟时间越长。
                     */
                    delay = ((Math.abs(col / 2 - j) + Math.abs(row / 2 - i))) * 100;
                }
                else if (type === '9') {
                    // * 从四周向中心聚齐
                    /**
                     * col / 2：表示列数的一半。这是表达式中的第一个因子，由于j代表列索引，col/2 - j表示从中央列到当前列j的距离。这个值的绝对值（Math.abs）表示当前列j到中央列的距离，不考虑方向。
                     * row / 2：表示行数的一半。这是表达式中的第二个因子，由于i代表行索引，row/2 - i表示从中央行到当前行i的距离。这个值的绝对值（Math.abs）表示当前行i到中央行的距离，不考虑方向。
                     * col/2 - Math.abs(col/2 - j)：这是第一个因子，表示当前列j到中央列的距离，但只考虑中央列左侧的部分（因为绝对值的存在，使得右侧的距离被忽略）。
                     * row/2 - Math.abs(row/2 - i)：这是第二个因子，表示当前行i到中央行的距离，但只考虑中央行上方的部分。
                     * (col/2 - Math.abs(col/2 - j) + (col/2 - Math.abs(row/2 - i)))：将两个因子相加，得到当前点(i, j)到中央点的总距离。这个距离通过col/2和row/2进行了归一化，使得无论方阵大小如何，最大距离总是col/2 + row/2。
                     * (col/2 - Math.abs(col/2 - j) + (col/2 - Math.abs(row/2 - i))) * 100：这一步将总距离转换为延迟时间（以毫秒为单位）。通过乘以因子100，确保延迟时间足够长，以便在视觉上能够观察到效果。
                     */
                    delay = (col / 2 - Math.abs(col / 2 - j) + (col / 2 - Math.abs(row / 2 - i))) * 100;
                }

                smallBox.style.animationDelay = `${delay}ms`

                // ! 一定要注意 will-change 不可能被滥用，注意重置回来❗
                // * 此处解决相邻图片白边问题
                smallBox.style.willChange = 'transform'
                // 在动画执行后，需要重置will-change
                const timer = setTimeout(() => {
                    smallBox.style.willChange = 'initial'
                    clearTimeout(timer)
                }, 3000)

                // 相邻两个小块旋转相反
                const contrary = (i + j) % 2 === 0
                smallBox.style.setProperty('--rotateX', `rotateX(${contrary ? -180 : 0}deg)`)
                smallBox.style.setProperty('--rotateY', `rotateY(${contrary ? 0 : -180}deg)`)

                // 插入小块
                box.appendChild(smallBox)
            }
        }
    }

    return (
        <div className={s.imageBox}>
            <div className={s.btn}>
                <Button
                    style={{marginBottom: '10px', marginRight: '10px'}}
                    type="primary"
                    onClick={() => {
                        setType('1')
                    }}
                >从上到下</Button>

                <Button
                    style={{marginBottom: '10px', marginRight: '10px'}}
                    type="primary"
                    onClick={() => {
                        setType('2')
                    }}
                >从左到右</Button>

                <Button
                    style={{marginBottom: '10px', marginRight: '10px'}}
                    type="primary"
                    onClick={() => {
                        setType('3')
                    }}
                >从左上角到右下角</Button>

                <Button
                    style={{marginBottom: '10px', marginRight: '10px'}}
                    type="primary"
                    onClick={() => {
                        setType('4')
                    }}
                >从右下角到左上角</Button>

                <Button
                    style={{marginBottom: '10px', marginRight: '10px'}}
                    type="primary"
                    onClick={() => {
                        setType('5')
                    }}
                >右上角到左下角</Button>

                <Button
                    style={{marginBottom: '10px', marginRight: '10px'}}
                    type="primary"
                    onClick={() => {
                        setType('6')
                    }}
                >左下角到右上角</Button>

                <Button
                    style={{marginBottom: '10px', marginRight: '10px'}}
                    type="primary"
                    onClick={() => {
                        setType('7')
                    }}
                >随机</Button>

                <Button
                    style={{marginBottom: '10px', marginRight: '10px'}}
                    type="primary"
                    onClick={() => {
                        setType('8')
                    }}
                >从中心向四周扩散</Button>

                <Button
                    style={{marginBottom: '10px', marginRight: '10px'}}
                    type="primary"
                    onClick={() => {
                        setType('9')
                    }}
                >从四周向中心聚齐</Button>
            </div>

            <div
                className={s.img}
                ref={imgRef}
            ></div>
        </div>
    )
}
