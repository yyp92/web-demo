import React from 'react'
import s from './index.module.scss'

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
            <img className={s.rotate1} src="https://picsum.photos/1000/1000?random=5" alt="" />
        </div>
      </div>
      
      <h3>Grid 布局配合正反旋转动画</h3>
      <div className={s.gridBox}>
        <div className={s.container}>
          <div className={s.A}>
              <img src="https://picsum.photos/1200/1200?random=1" alt="" />
          </div>

          <div className={s.B}>
              <img src="https://picsum.photos/1200/1200?random=2" alt="" />
          </div>

          <div className={s.C}>
              <img src="https://picsum.photos/1200/1200?random=3" alt="" />
          </div>

          <div className={s.D}>
              <img src="https://picsum.photos/1200/1200?random=4" alt="" />
          </div>

          <div className={s.E}>
              <img src="https://picsum.photos/1200/1200?random=5" alt="" />
          </div>
        </div>
      </div>
      
    </div>
  )
}