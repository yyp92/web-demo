import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './in.css'
import Ttml2canvas from './components/Ttml2canvas'
import {
  EmptyPage,
  StickyPage,
  BackgroundClip,
} from './components/CssAttr'
import Layout from './Layout'

function App() {
  return (
    <div id="app">
      {/* <h1>web demo</h1> */}
      
      {/* html2canvas学习,dom转为图片 */}
      {/* <Ttml2canvas /> */}

      {/* css 属性 */}
      {/* <EmptyPage /> */}
      {/* <StickyPage /> */}
      {/* <BackgroundClip /> */}

      <Layout />
    </div>
  )
}

export default App
