import React from 'react'
import c from 'classnames'
import s from './index.module.scss'

export const CssHexagon = () => {
    return (
        <div className={s.cssHexagon}>
            <h3>实现背景网格</h3>
            <div className={s.gContainer}>
                <ul className={s.gBg}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <h3>实现六芒星样式</h3>
            <div className={c(s.gContainer, s.gContainer1)}></div>
            <div className={c(s.gContainer, s.gContainer2)}></div>

            <h3>借助 CSS @Property 实现动画 Hover 效果</h3>
            <div className={s.gContainer3}></div>
            <div className={s.gContainer4}></div>

            <h3>实现六芒星样式 - 不规则图形</h3>
            <div className={s.gContainer5}>
                <ul className={s.gBg}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div className={s.gContent1}></div>
            </div>
            <div className={s.gContainer6}>
                <ul className={s.gBg}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div className={s.gContent2}></div>
            </div>
        </div>
    )
}