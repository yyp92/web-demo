import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Ttml2canvas from './components/Ttml2canvas'
import {
  EmptyPage,
  StickyPage,
  BackgroundClip,
} from './components/CssAttr'

function App() {
  return (
    <div className="App">
      {/* <h1>web demo</h1> */}
      
      {/* html2canvas学习,dom转为图片 */}
      {/* <Ttml2canvas /> */}

      {/* css 属性 */}
      {/* <EmptyPage /> */}
      {/* <StickyPage /> */}
      <BackgroundClip />
    </div>
  )
}

export default App
