/**
 * 角向渐变妙用
 */

import React from 'react'
import s from './index.module.scss'

export const ConicGradient = () => {
    return (
        <div className={s.ConicGradient}>
            <h2>角向渐变</h2>

            <h3>快速实现网格布局</h3>
            <div className={s.content1}></div>

            <h3>角向渐变的技巧</h3>
            <div className={s.content2}></div>
            <div className={s.content3}></div>
            <div className={s.content4}></div>
            <div className={s.content5}></div>
            <div className={s.content6}></div>

            <h3>理解上述技巧实现图形加号</h3>
            <div className={s.content7}></div>
            <div className={s.content8}></div>
        </div>
    )
}