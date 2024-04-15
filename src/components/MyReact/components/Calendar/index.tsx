import {CSSProperties, ReactNode, useState} from 'react'
import dayjs, {Dayjs} from 'dayjs'
import c from 'classnames'

import MonthCalendar from './MonthCalendar'
import Header from './Header'
import LocaleContext from './LocaleContext'

import styles from './index.module.scss'


export interface CalendarProps {
    // 当前日期
    value: Dayjs

    // style 和 className 用于修改 Calendar 组件外层容器的样式
    style?: CSSProperties
    classNames?: string | string[]

    // 定制日期显示，会完全覆盖日期单元格
    dateRender?: (currentDate: Dayjs) => ReactNode
    // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效
    dateInnerContent?: (currentDate: Dayjs) => ReactNode

    // 国际化相关
    locale?: string

    onChange?: (date: Dayjs) => void
}

const Calendar = (props: CalendarProps) => {
    const {
        value,
        style,
        classNames,
        locale,
        onChange
    } = props
    const [curValue, setCurValue] = useState<Dayjs>(value)
    const [curMonth, setCurMonth] = useState<Dayjs>(value)


    // ********* 操作 *********
    const changeDate = (date: Dayjs) => {
        setCurValue(date)
        setCurMonth(date)
        onChange?.(date)
    }
    
    const selectHandler = (date: Dayjs) => {
        // 希望点击上下月份的日期的时候，能够跳转到那个月的日历
        // setCurMonth(date)
        
        changeDate(date)
    }

    const preMonthHandler = () => {
        setCurMonth(curMonth.subtract(1, 'month'))
    } 

    const nextMonthHandler = () => {
        setCurMonth(curMonth.add(1, 'month'))
    } 

    const todayHandler = () => {
        const date = dayjs(Date.now())

        changeDate(date)
    }
    

    // ********* 渲染 *********
    return (
        <LocaleContext.Provider
            value={{locale: locale || navigator.language}}
        >
            <div
                style={style}
                className={c(
                    styles.calendar,
                    classNames
                )}
            >
                <Header
                    curMonth={curMonth}
                    preMonthHandler={preMonthHandler}
                    nextMonthHandler={nextMonthHandler}
                    todayHandler={todayHandler}
                />

                <MonthCalendar
                    {...props}
                    value={curValue}
                    curMonth={curMonth}
                    selectHandler={selectHandler}
                />
            </div>
        </LocaleContext.Provider>
    )
}

export default Calendar