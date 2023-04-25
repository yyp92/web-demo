import React from 'react'
import c from 'classnames'
import s from './index.module.scss'

export const CssMask = () => {
    return (
        <div className={s.cssMask}>
            <h3>MASK 的基本使用</h3>
            <div className={c(s.imgWrap, s.imgWrap1)}></div>

            <h3>使用 MASK 进行图片裁切</h3>
            <div className={c(s.imgWrap, s.imgWrap2)}></div>

            <h3>多张图片下使用 mask</h3>
            <div className={c(s.imgWrap, s.imgWrap3)}></div>

            <h3>使用 MASK 进行转场动画</h3>
            <div className={c(s.imgWrap, s.imgWrap4)}></div>

            <h3>使用角向渐变 mask: conic-gradient() 进行切换</h3>
            <div className={c(s.imgWrap, s.imgWrap5)}></div>

            <h3>mask 制作转场动画</h3>
            <div className={c(s.imgWrap, s.imgWrap12)}>
                <div className={s.inner1}></div>
                <div className={s.inner2}></div>
            </div>

            <h3>滤镜 filter: contrast()</h3>
            <div className={c(s.imgWrap, s.imgWrap6)}></div>

            <h3>使用 mask 搭配滤镜 contrast</h3>
            <div className={c(s.imgWrap, s.imgWrap7)}></div>

            <h3>使用 mask 搭配滤镜 contrast - 径向</h3>
            <div className={c(s.imgWrap, s.imgWrap8)}></div> 
                 
            <h3>使用 mask 搭配滤镜 contrast 及动画</h3>
            <div className={c(s.imgWrap, s.imgWrap9)}></div>  

            <h3>使用 mask 搭配滤镜 contrast 及动画2</h3>
            <div className={c(s.imgWrap, s.imgWrap10)}></div>   

            <h3>mask & 滤镜 filter: contrast() & 混合模式</h3>
            <div className={c(s.imgWrap, s.imgWrap11)}>
                <div className={s.inner}></div>
            </div>    
        </div>
    )
}