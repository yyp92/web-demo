import {ForwardRefRenderFunction ,forwardRef, useState, useImperativeHandle, } from 'react'
import c from 'classnames'

import styles from './index.module.scss'


interface CalendarProps {
    value?: Date
    onChange?: (date: Date) => void
}

// 提供 ref 来暴露一些 Canlendar 组件的 api
export interface CalendarRef {
    getDate: () => Date,
    setDate: (date: Date) => void
}


const InternalCalendar: ForwardRefRenderFunction<CalendarRef, CalendarProps> = (
    {
        value = new Date(),
        onChange
    },
    ref
) => {
    // 默认今天
    const [date, setDate] = useState(value);

    // 暴露给父组件的api
    useImperativeHandle(
        ref,
        () => {
            return {
                getDate() {
                    return date
                },
                setDate(date: Date) {
                    setDate(date)
                }
            }
        }
    )


    // ********* 操作 *********
    const monthNames = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
    ];

    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    }

    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    }

    // 计算当前月有多少天
    const daysOfMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    }
    
    // 计算当前月的第一天是星期几， 0：星期天
    const firstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    }    


    // ********* 渲染 *********
    const renderDays = () => {
        const days = [];
    
        const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
        const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());
    
        // 渲染 day - 1 个 empty 的块
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div
                    key={`empty-${i}`}
                    className={styles.empty}
                ></div>
            )
        }
    
        // 渲染 daysCount 个 day 的块
        for (let i = 1; i <= daysCount; i++) {
            // onChange 回调函数
            const clickHandler = onChange?.bind(
                null,
                new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    i
                )
            )

            days.push(
                <div
                    key={i}
                    className={c(
                        styles.day,
                        {
                            [styles.selected]: i === date.getDate()
                        }
                    )}
                    onClick={clickHandler}
                >{i}</div>
            );
        }
    
        return days;
    }

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <button
                    onClick={handlePrevMonth}
                >&lt;</button>

                <div>{date.getFullYear()}年 {monthNames[date.getMonth()]}</div>

                <button
                    onClick={handleNextMonth}
                >&gt;</button>
            </div>

            <div className={styles.days}>
                <div className={styles.day}>日</div>
                <div className={styles.day}>一</div>
                <div className={styles.day}>二</div>
                <div className={styles.day}>三</div>
                <div className={styles.day}>四</div>
                <div className={styles.day}>五</div>
                <div className={styles.day}>六</div>

                {renderDays()}
            </div>
        </div>
    )
}

const MiniCalendar = forwardRef(InternalCalendar)

export default MiniCalendar