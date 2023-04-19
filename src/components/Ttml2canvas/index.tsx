import React, { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import generateShareImage from './generateShareImage'

function Ttml2canvas() {
  const hanldeCreateImg = () => {
    generateShareImage('recoil-wrap', 'preview')
  }

  return (
    <React.Fragment>
        <div id="recoil-wrap" style={{textAlign: 'center'}}>
            <div>html2canvas学习,dom转为图片</div>
            
            <img alt="测试logo" src={reactLogo} />
        </div>
        
        {/* 生成图片 */}
        <div
            style={{
            border: '1px dashed red',
            width: '800px',
            margin: '20px auto',
            borderRadius: '20px'
            }}
        >
            <button
                style={{marginTop: '20px'}}
                onClick={hanldeCreateImg}
            >生成图片</button>

            <div
                style={{
                    width: '100%',
                    height: '200px',
                    padding: '20px',
                    boxSizing: 'border-box'
                }}
            >
                <h3>预览</h3>
                <div
                    id="preview"
                    style={{
                    border: '1px dashed green',
                    padding: '5px'
                    }}
                ></div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Ttml2canvas
