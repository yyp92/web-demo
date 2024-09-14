// ! layout 布局
import React, {useEffect, useState} from 'react';
import { Routes, Route, Outlet, Link, useRoutes, useLocation, useNavigate } from 'react-router-dom';
import c from 'classnames'

import {RouterConfigItem, routerConfig} from './routerConfig'

import s from './index.module.scss'
import { Button } from 'antd';
import Triggle from './components/Common/triggle';

/**
 * <Route path="/" element={<LayoutPage />}>
        <Route path="/">
            <Route index element={<>home1</>} />
            <Route path="2" element={<>home2</>} />
        </Route>
        <Route path="about">
            <Route index element={<>about1</>} />
            <Route path="2" element={<>about2</>} />
        </Route>
        <Route path="dashboard" element={<>dashboard</>} />
        <Route path="*" element={<>404</>} />
    </Route>
 */


const routeList: any = []

// 全局context, 创建context
const LayoutContext = React.createContext<any>({})
// 一级菜单的第一个的key
let firstKey = ''


// 递归的模板
const renderNavItem = (
    list: RouterConfigItem[],
    active: string,
    handleItemClick: (key: string) => void,
    index: number = 0,
    item?: RouterConfigItem
) => {
    const {initPathname = ''} = React.useContext(LayoutContext)
    const path = item?.link

    // 匹配以 ** 结尾
    const matchEndActivePath = (path: string) => {
        return new RegExp(`${path}$`, 'g')
    }

    return (
        <ul
            key={index}
            className={s.leftSideItem}
        >
            {
                 list.map((item: RouterConfigItem, index: number) => {
                    const {
                        key,
                        parentKey,
                        text,
                        link,
                        template,
                        icon,
                        children,
                        index: iindex
                    } = item

                    if (!firstKey) {
                        firstKey = key
                    }

                    const newLink = path && path !== '/' ? `${path}${link === '/' ? '' : '/' + link}` : link
                    const isActive = 
                        // 点击时的激活
                        active === key
                        // 点击二级菜单时，让一级菜单激活
                        || initPathname.indexOf(key) > -1
                        // 刷新时，二级菜单激活
                        || parentKey && (
                            // 二级菜单不是第一个的情况
                            matchEndActivePath(key).test(initPathname)
                            // 二级菜单是第一个的情况
                            || (parentKey === initPathname.slice(1)) && iindex  
                        )
                    // 只有激活的一级菜单展开
                    const troggle = !isActive && !parentKey

                    if (Array.isArray(children) && children?.length) {
                        return (
                            <li
                                key={key}
                                className={c({[s.leftSideItemHidden]: troggle})}
                            >
                                <Triggle
                                    title={
                                        <Link
                                            className={c(
                                                {
                                                    [s.leftSideItemActive]: isActive
                                                }
                                            )}
                                            onClick={() => handleItemClick(key) as any}
                                            to={newLink as any}
                                        >{text}</Link>
                                    }
                                    children={renderNavItem(children, active, handleItemClick, index, item)}
                                    triggle={!troggle}
                                />

                                {/* {renderNavItem(children, active, handleItemClick, index, item)} */}
                            </li>
                        )
                    }

                    return (
                        text && <li
                            key={key}
                            className={c({[s.leftSideItemHidden]: troggle})}
                        >
                            <Link
                                className={c({
                                    [s.leftSideItemActive]: isActive
                                })}
                                onClick={() => handleItemClick(key) as any}
                                to={newLink as any}
                            >{text}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

// layout
const renderNav = (list: RouterConfigItem[]) => {
    const {initPathname = ''} = React.useContext(LayoutContext)
    const navigate = useNavigate()
    const [active, setActive] = React.useState<string>('home')

    useEffect(() => {
        // navigate('')
        if (initPathname === '/') {
            navigate(`/${firstKey}`)
        }
    }, [])

    // 点击路由
    const handleItemClick = (key: string) => {
        setActive(key)
    }

    return renderNavItem(list, active, handleItemClick)
}

const LayoutPage = () => {
    const [isDark, setIsDark] = useState<boolean>(false)
 
    useEffect(() => {
        // todo 根据逻辑来显示主题
        getDarkTheme(isDark ? 1 : 0)
    }, [isDark])

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
        <div className={s.container}>
            {/* "布局路由（layout）"适合放置一些被所有页面共享的组件，比如导航栏 */}
            <nav className={s.leftSide}>
                <div className={s.logo}>个人练习</div>

                {renderNav(routerConfig)}

                <Button
                    className={s.changeTheme}
                    type="primary"
                    onClick={() => {
                        setIsDark(!isDark)
                    }}
                >{isDark ? '明亮' : '暗黑'}</Button>
            </nav>

            <div
                id="content"
                className={s.content}
            >
                {/* <Outlet> 绘制当前（被选中的）激活的子路由组件，你可以理解为是我们事先定义的子路由组件的占位符 */}
                <Outlet />
            </div>
        </div>
    )
}


/**
 * 渲染路由项 - 递归
 */
const renderRouterItem = (list: RouterConfigItem[]) => {
    return list.map((item: RouterConfigItem) => {
        const {
            key,
            text,
            link,
            template,
            icon,
            children,
            index
        } = item

        const props: any = {
            key,
            // element: template ?? null,
            // path: link,
        }

        if (template) {
            props.element = template
        }

        if (index) {
            props.index = index
        }
        else {
            props.path = link
        }

        return (
            <Route
                {...props}
            >
                {Array.isArray(children) && children?.length && renderRouterItem(children)}
            </Route>
        )
    })
}

const render1 = () => {
    return (
        <Route path="/" element={<LayoutPage />}>
            <Route path="/">
                <Route index element={<>home1</>} />
                <Route path="2" element={<>home2</>} />
            </Route>
            <Route path="about">
                <Route index element={<>about1</>} />
                <Route path="2" element={<>about2</>} />
            </Route>
            <Route path="dashboard" element={<>dashboard</>} />
            <Route path="*" element={<>404</>} />
        </Route>
    )
}

// console.log('renderRouterItem(routerConfig)', renderRouterItem(routerConfig), render1())


/**
 * 渲染路由
 */
const Layout = () => {
    // const element = useRoutes(routeList)
    // 初始化激活路径
    const {pathname = ''} = useLocation() ?? {}
    const defaultContext = {initPathname: pathname}

    /**
     * 路由嵌套， 嵌套的子路由路径是基于父路由路径生成的，
     * 且子路由元素绘制在父路由元素里面。请看下面的<Outlet>
     */

    return (
        <React.Fragment>
            <LayoutContext.Provider value={defaultContext}>
                <Routes>
                    {/* {renderRouterItem(routerConfig)} */}
                    <Route path="/" element={<LayoutPage />}>
                        {renderRouterItem(routerConfig)}
                    </Route>

                    {/* {render1()} */}
                </Routes>
                {/* {element} */}
            </LayoutContext.Provider>
        </React.Fragment>
    )        
}


export default Layout