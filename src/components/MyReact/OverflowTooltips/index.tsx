import {OverflowTooltip} from './Overflow'


export const OverflowTooltips = () => {
    return (
        <div>
            <OverflowTooltip
                text='文字超出显示省略号并且触发Tooltip 的组件封装'
                width={500}
            />

            <OverflowTooltip
                text='文字超出显示省略号并且触发Tooltip 的组件封装'
                width={200}
            />
        </div>
    )
}
