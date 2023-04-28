import React from 'react'
import s from './index.module.scss'
import img1 from '@/assets/mask-1.jpg'
import img2 from '@/assets/mask-2.jpg'
import img3 from '@/assets/mask-3.png'
import img4 from '@/assets/mask-4.png'
import img5 from '@/assets/5.webp'

export const CssVariableAnimation = () => {
  return (
    <div className={s.wrap}>
      <h2>高级感拉满的网格动画</h2>

      <h3>正反旋转相消 3D Card 动画</h3>
      <div className={s.reverseRotate}>
        <div className={s.rotate}>
            正反旋转相消 3D Card 动画
        </div>
      </div>
      
      <h3>图片旋转配合容器旋转</h3>
      <div className={s.reverseRotateWrap1}>
        <div className={s.reverseRotate1}>
            <img className={s.rotate1} src={img1} alt="" />
        </div>
      </div>
      
      <h3>Grid 布局配合正反旋转动画</h3>
      <div className={s.gridBox}>
        <div className={s.container}>
          <div className={s.A}>
              <img src={img5} alt="" />
          </div>

          <div className={s.B}>
              <img src={img1} alt="" />
          </div>

          <div className={s.C}>
              <img src={img2} alt="" />
          </div>

          <div className={s.D}>
              <img src={img3} alt="" />
          </div>

          <div className={s.E}>
              <img src={img4} alt="" />
          </div>
        </div>
      </div>
      
    </div>
  )
}