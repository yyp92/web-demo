import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'

import Layout from './Layout'

function App() {
    useEffect(() => {
        // todo 根据逻辑来显示主题
        getDarkTheme(0)
    }, [])

    // * 主题切换
    // 0： light, 1: dark
    const getDarkTheme = (theme: number) => {
        // 获取根元素
        const root = document.documentElement;

        if (theme != 1) {
            // 修改 data-theme 属性的值为 "light"
            root.setAttribute('data-theme', 'light');
            return
        }

        // 修改 data-theme 属性的值为 "dark"
        root.setAttribute('data-theme', 'dark');
    }

    return (
        <div id="app">
            <Layout />
        </div>
    )
}

export default App
