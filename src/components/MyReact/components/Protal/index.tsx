import { forwardRef, useEffect, useMemo, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
    // 挂载到的 dom 节点，默认是 document.body
    attach?: HTMLElement | string;
    children: React.ReactNode;
}

export function getAttach(attach: PortalProps['attach']) {
    // 如果是 string，就作为选择器来找到对应的 dom
    if (typeof attach === 'string') {
        return document.querySelector(attach);
    }

    // 如果是 HTMLElement，则直接作为挂载节点
    if (typeof attach === 'object' && attach instanceof window.HTMLElement) {
        return attach;
    }

    return document.body;
}

const Portal = forwardRef((props: PortalProps, ref) => {
    const { 
        attach = document.body, 
        children 
    } = props;

    // 在 attach 的元素下添加一个 dom 节点作为容器
    const container = useMemo(() => {
        const el = document.createElement('div');
        el.className = `portal-wrapper`;

        return el;
    }, []);

    useEffect(() => {
        const parentElement = getAttach(attach);
        parentElement?.appendChild?.(container);

        return () => {
            parentElement?.removeChild?.(container);
        };
    }, [container, attach]);

    // 通过 forwardRef + useImperativeHandle 把容器 dom 返回
    useImperativeHandle(ref, () => container);

    return createPortal(children, container);
});

export default Portal;


