/**
 * * Space
 * 
 * direction: 设置子组件方向，水平还是竖直排列
 * size：设置水平、竖直的间距
 * align：子组件的对齐方式
 * wrap：超过一屏是否换行，只在水平时有用
 * split：分割线
 * 多个 Space 组件的 size 可以通过 ConfigProvider 统一设置默认值。
 */
import React from 'react'
import c from 'classnames'
import { ConfigContext } from './ConfigProvider';

import './index.scss'

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    style?: React.CSSProperties;

    // 传单个值代表横竖间距，或者传一个数组，分别设置横竖间距
    size?: SizeType | [SizeType, SizeType];

    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'end' | 'center' | 'baseline';
    split?: React.ReactNode;
    wrap?: boolean;
}

const spaceSize = {
    small: 8,
    middle: 16,
    large: 24,
};
  
function getNumberSize(size: SizeType) {
    return typeof size === 'string'
        ? spaceSize[size] 
        : size || 0;
}

const Space: React.FC<SpaceProps> = (props) => {
    const { space } = React.useContext(ConfigContext);
    const {
        className,
        style,
        children,
    
        // size 默认值会优先用 context 里的值
        size = space?.size || 'small',
        
        direction = 'horizontal',
        align,
        split,
        wrap = false,
        ...otherProps
    } = props
    // 根据传入的 size 来计算间距
    const otherStyles: React.CSSProperties = {};
    const [horizontalSize, verticalSize] = React.useMemo(
        () =>
            (
                (Array.isArray(size)
                    ? size
                    : [size, size]
                ) as [SizeType, SizeType]
            ).map(item =>
                getNumberSize(item),
            ),
        [size]
    );
    otherStyles.columnGap = horizontalSize;
    otherStyles.rowGap = verticalSize;
    if (wrap) {
        otherStyles.flexWrap = 'wrap';
    }

    // React.Children.toArray 对 children 做扁平化
    const childNodes = React.Children.toArray(children);
    const mergedAlign = direction === 'horizontal' && align === undefined ? 'center' : align
    const cn = c(
        'space',
        `space-${direction}`,
        {
            [`space-align-${mergedAlign}`]: mergedAlign,
        },
        className,
    );

    const nodes = childNodes.map((child: any, i) => {
        const key = child && child.key || `space-item-${i}`
    
        return (
            <div
                className='space-iItem'
                key={key}
            >
                {child}

                {
                    i < childNodes.length && split && (
                        <span
                            className={`${className}-split`}
                            style={style}
                        >
                            {split}
                        </span>
                    )
                }
            </div>
        )
    })

    return (
        <div
            className={cn}
            style={{
                ...otherStyles,
                ...style
            }}
            {...otherProps}
        >
            {nodes}
        </div>
    )
}

export default Space