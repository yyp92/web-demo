// ! layout 布局
import React from 'react';
import { Routes, Route, Outlet, Link, useRoutes } from 'react-router-dom';
import c from 'classnames'

import s from './index.module.scss'

interface RouterConfigItem {
    key: string;
    parentKey?: string
    index?: true
    text?: string;
    template?: null | React.ReactElement;
    link?: string;
    icon: null | React.ReactElement;
    children?: RouterConfigItem[]
}

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

// 路由配置项
const routerConfig: RouterConfigItem[] = [
    {
        key: 'home',
        text: 'Home',
        link: '/',
        // template: <Home />,
        icon: null,
        // children: [],
        children: [
            {
                key: 'home1',
                parentKey: 'home',
                index: true,
                text: 'Home1',
                link: '/',
                template: <>Home1</>,
                icon: null,
            },
            {
                key: 'home2',
                parentKey: 'home',
                text: 'Home2',
                link: '2',
                template: <>Home2</>,
                icon: null,
            }
        ],
    },
    {
        key: 'about',
        text: 'About',
        link: 'about',
        // template: <>about</>,
        icon: null,
        children: [
            {
                key: 'about1',
                parentKey: 'about',
                index: true,
                text: 'about1',
                link: '/',
                template: <>about1</>,
                icon: null,
            },
            {
                key: 'about2',
                parentKey: 'about',
                text: 'about2',
                link: '2',
                template: <>about2</>,
                icon: null,
            }
        ],
    },
    {
        key: 'dashboard',
        text: 'Dashboard',
        link: 'dashboard',
        template: <>dashboard</>,
        icon: null,
        children: [],
    },

    // 使用 path="*"" 意味着 "匹配所有路径", 所以我们不需要明确地列出别的路径了。
    {
        key: '404',
        link: '*',
        template: <>404</>,
        icon: null,
        children: [],
    }
]

const routeList: any = []

// 递归的模板
const renderNavItem = (
    list: RouterConfigItem[],
    active: string,
    handleItemClick: (key: string) => void,
    index: number = 0,
    item?: RouterConfigItem
) => {
    const path = item?.link

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

                    // if (parentKey) {
                    //     const index = routeList.findIndex((item: any) => item?.key === parentKey)

                    //     if (index > -1) {
                    //         routeList[index].children.push({
                    //             key,
                    //             path: link,
                    //             element: template
                    //         })
                    //     }
                       
                    // }
                    // else {
                    //     routeList[index] = {
                    //         key,
                    //         path: link,
                    //         element: template,
                    //         children: Array.isArray(children) ? [] : undefined
                    //     }
                    // }

                    const newLink = path && path !== '/' ? `${path}${link === '/' ? '' : '/' + link}` : link

                    if (Array.isArray(children) && children?.length) {
                        return (
                            <li key={key}>
                                <Link
                                    className={c({
                                        [s.leftSideItemActive]: active === key
                                    })}
                                    onClick={() => handleItemClick(key) as any}
                                    to={newLink as any}
                                >{text}</Link>

                                {renderNavItem(children, active, handleItemClick, index, item)}
                            </li>
                        )
                    }

                    return (
                        text && <li key={key}>
                            <Link
                                className={c({
                                    [s.leftSideItemActive]: active === key
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
    const [active, setActive] = React.useState<string>('home')

    // 点击路由
    const handleItemClick = (key: string) => {
        setActive(key)
    }

    return renderNavItem(list, active, handleItemClick)
}

const LayoutPage = () => {
    return (
        <div className={s.container}>
            {/* "布局路由（layout）"适合放置一些被所有页面共享的组件，比如导航栏 */}
            <nav className={s.leftSide}>
                {renderNav(routerConfig)}
            </nav>

            <div className={s.content}>
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
    const element = useRoutes(routeList)

    /**
     * 路由嵌套， 嵌套的子路由路径是基于父路由路径生成的，
     * 且子路由元素绘制在父路由元素里面。请看下面的<Outlet>
     */

    return (
        <React.Fragment>
            <Routes>
                {/* {renderRouterItem(routerConfig)} */}
                <Route path="/" element={<LayoutPage />}>
                    {renderRouterItem(routerConfig)}
                </Route>

                {/* {render1()} */}
            </Routes>
            {/* {element} */}
        </React.Fragment>
    )        
}


export default Layout