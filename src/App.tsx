import { useState, useEffect } from 'react'

import Layout from './Layout'

function App() {
    useEffect(() => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = '//at.alicdn.com/t/c/font_4509351_vkd9anrde8.css'
        document.head.appendChild(link)

        // 在组件卸载时移除 link 元素，避免内存泄漏
        return () => {
            document.head.removeChild(link)
        }
    }, [])

    return (
        <div id="app">
            <Layout />
        </div>
    )
}

export default App
