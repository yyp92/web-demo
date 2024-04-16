import {PropsWithChildren, forwardRef, CSSProperties, SVGAttributes} from 'react';
import c from 'classnames'

import styles from './index.module.scss'


type BaseIconProps = {
    className?: string;
    style?: CSSProperties;
    size?: string | string [];
    spin?: boolean;
};

export type IconProps = BaseIconProps & Omit<SVGAttributes<SVGElement>, keyof BaseIconProps>

// 能通过 font-size 修改 Icon 组件的大小
export const getSize = (size: IconProps['size']) => {
    if (Array.isArray(size) && size.length === 2) {
        return size as string[]
    }

    const width = (size as string) || '1em'
    const height = (size as string) || '1em'

    return [width, height]
}

export const Icon = forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>((
    props,
    ref
) => {
    const {
        style,
        className,
        spin,
        size = '1em',
        children,
        ...rest
    } = props;

    const [width, height] = getSize(size)

    const cn = c(
        styles.icon,
        {
            [styles.iconSpin]: spin
        },
        className
    )

    return (
        <svg 
            ref={ref}
            style={style}
            className={cn}
            width={width}
            height={height}
            fill="currentColor"
            {...rest}
        >
            {children}
        </svg>
    )
})