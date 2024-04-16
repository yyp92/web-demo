/**
 * * 支持下 iconfont 的图标
 */
import React from 'react';
import { Icon, IconProps } from './';

// 如果加载过的就不用再次加载了，所以用 Set 来记录下
const loadedSet = new Set<string>();

export function createFromIconfont(scriptUrl: string) {
    // createFromIconfont 会传入 scriptUrl，我们在 document.body 上添加 <script> 标签引入它
    if (
        typeof scriptUrl === 'string'
        && scriptUrl.length
        && !loadedSet.has(scriptUrl)
    ) {
        const script = document.createElement('script');
        script.setAttribute('src', scriptUrl);
        script.setAttribute('data-namespace', scriptUrl);
        document.body.appendChild(script);

        loadedSet.add(scriptUrl);
    }

    const Iconfont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
        const { type, ...rest } = props;

        return (
            <Icon
                {...rest}
                ref={ref}
            >
                {
                    type
                        // 用的时候使用 <use xlinkHref="#type" > 引用
                        ? <use xlinkHref={`#${type}`} />
                        : null
                }
            </Icon>
        );
    });

    return Iconfont;
}
