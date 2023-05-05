/**
 * 不定宽文本溢出跑马灯效果完美解决方案
 */

import React from 'react'
import s from './index.module.scss'

export const TextOverflowMarquee = () => {
    return (
        <div className={s.textOverflowMarquee}>
            <div className={s.marquee}>
                <span>Lorem ipsum dolor sit amet elit. Animi, aliquid.</span>
            </div>
        </div>
    )
}
