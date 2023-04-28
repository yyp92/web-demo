import React from 'react'
import s from './index.module.scss'

export const ImgGraduallyDisappear = () => {
    return (
        <div className={s.imgGraduallyDisappear}>
            <h2>图片渐隐消失术</h2>

            <h3>初探</h3>
            <div className={s.img}></div>

            <h3>强大的 CSS @Property</h3>
            <div className={s.img1}></div>

            <h3>借助多重 mask 分割图片</h3>
            <div className={s.img2}></div>

            <h3>继续切割为 4 重 mask</h3>
            <div className={s.img3}></div>

            <h3>基于 SCSS 简化代码</h3>
            <div className={s.img4}></div>

            <h3>调整过渡变量，控制方向</h3>
            <div className={s.img5}></div>

            <h3>文本</h3>
            <div className={s.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, soluta? Rerum consequatur dolore vero suscipit a. Esse maxime harum, quasi ea enim quod ipsum dignissimos cupiditate laboriosam magnam numquam et.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, soluta? Rerum consequatur dolore vero suscipit a. Esse maxime harum, quasi ea enim quod ipsum dignissimos cupiditate laboriosam magnam numquam et.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, soluta? Rerum consequatur dolore vero suscipit a. Esse maxime harum, quasi ea enim quod ipsum dignissimos cupiditate laboriosam magnam numquam et.</div>
        </div>
    )
}