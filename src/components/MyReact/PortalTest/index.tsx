import React, {useRef, useEffect} from 'react'
import { createPortal } from 'react-dom'
import Portal from '../components/Protal'


export const PortalTest = () => {
    const containerRef = useRef<HTMLElement>(null);

    const content = <div className="btn">
        <button>按钮</button>
    </div>;

    useEffect(()=> {
        console.log(containerRef);
    }, []);

    // * react 提供了 createPortal 的 api，可以把组件渲染到某个 dom 下
    // return createPortal(content, document.body);

    // return (
    //     <Portal attach={document.body}>
    //         {content}
    //     </Portal>
    // )

    // 通过 ref 获取内部的容器 dom
    return (
        <Portal
            attach={document.body}
            ref={containerRef}
        >
            {content}
        </Portal>
    )
}