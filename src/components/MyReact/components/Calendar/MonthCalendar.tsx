import { useContext } from 'react'
import {Dayjs} from 'dayjs'
import c from 'classnames'
import { CalendarProps } from '.'
// import CalendarLocale from './locale/zh-CN'
import allLocales from './locale'

import styles from './index.module.scss'
import LocaleContext from './LocaleContext'


interface MonthCalendarProps extends CalendarProps {
    curMonth: Dayjs 
    selectHandler?: (date: Dayjs) => void
}

const getAllDays = (date: Dayjs) => {
    // 这个月有多少天
    // const daysInMonth = date.daysInMonth();
    // 这个月第一天
    const startDate = date.startOf('month');
    // 这个月第一天是星期几
    const day = startDate.day() 

    // 创建一个 6 * 7 个元素的数组
    const daysInfo: Array<{date: Dayjs, currentMonth: boolean}> = new Array(6 * 7)

    // 填充前面的为上个月的日期
    for (let i = 0; i < day; i++) {
        daysInfo[i] = {
            // startDate: 返回减去一定时间的复制的 Day.js 对象
            date: startDate.subtract(day - i, 'day'),
            currentMonth: false
        }
    }

    // 填充本月的日期
    for (let i = day; i < daysInfo.length; i++) {
        // add: 返回增加一定时间的复制的 Day.js 对象
        const calcDate = startDate.add(i - day, 'day')

        daysInfo[i] = {
            date: calcDate,
            currentMonth: calcDate.month() === date.month()
        }
    }

    return daysInfo
}

// function renderDays(
//     days: Array<{date: Dayjs, currentMonth: boolean}>,
//     dateRender: MonthCalendarProps['dateRender'],
//     dateInnerContent: MonthCalendarProps['dateInnerContent'],
//     value: Dayjs,
//     selectHandler: MonthCalendarProps['selectHandler']
// ) {
//     const rows = []

//     // 行
//     for (let i = 0; i < 6; i++) {
//         const row = []

//         // 列
//         for (let j = 0; j < 7; j++) {
//             const item = days[i * 7 + j]

//             row[j] = (
//                 <div
//                     className={c(
//                         styles.calendarMonthBodyCell,
//                         {
//                             [styles.calendarMonthBodyCellCurrent]: item.currentMonth
//                         }
//                     )}
//                     onClick={() => selectHandler?.(item.date)}
//                 >
//                     {
//                         dateRender
//                             ? dateRender(item.date)
//                             : (
//                                 <div
//                                     className={styles.calendarMonthBodyCellDate}
//                                 >
//                                     <div
//                                         className={c(
//                                             styles.calendarMonthBodyCellDateValue,
//                                             {
//                                                 [styles.calendarMonthBodyCellDateSelected]: value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
//                                             }
//                                         )}
//                                     >{item.date.date()}</div>

//                                     <div className={styles.calendarMonthBodyCellDateContent}>{dateInnerContent?.(item.date)}</div>
//                                 </div>
//                             )
//                     }
//                 </div>
//             )
//         }

//         rows.push(row)
//     }

//     return rows.map((row) => {
//         return(
//             <div
//                 className={styles.calendarMonthBodyRow}
//             >
//                 {row}
//             </div>
//         )
//     })
// }

function MonthCalendar(props: MonthCalendarProps) {
    const {
        // 之前是拿到 value 所在月份来计算的日历
        value,
        curMonth,
        dateRender,
        dateInnerContent,
        selectHandler
    } = props
    const localeContext = useContext(LocaleContext)
    const weekList = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ]
    const allDays = getAllDays(curMonth)
    const CalendarLocale = allLocales[localeContext.locale]

    function renderDays(
        days: Array<{date: Dayjs, currentMonth: boolean}>
    ) {
        const rows = []
    
        // 行
        for (let i = 0; i < 6; i++) {
            const row = []
    
            // 列
            for (let j = 0; j < 7; j++) {
                const item = days[i * 7 + j]
    
                row[j] = (
                    <div
                        className={c(
                            styles.calendarMonthBodyCell,
                            {
                                [styles.calendarMonthBodyCellCurrent]: item.currentMonth
                            }
                        )}
                        onClick={() => selectHandler?.(item.date)}
                    >
                        {
                            dateRender
                                ? dateRender(item.date)
                                : (
                                    <div
                                        className={styles.calendarMonthBodyCellDate}
                                    >
                                        <div
                                            className={c(
                                                styles.calendarMonthBodyCellDateValue,
                                                {
                                                    [styles.calendarMonthBodyCellDateSelected]: value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
                                                }
                                            )}
                                        >{item.date.date()}</div>
    
                                        <div className={styles.calendarMonthBodyCellDateContent}>{dateInnerContent?.(item.date)}</div>
                                    </div>
                                )
                        }
                    </div>
                )
            }
    
            rows.push(row)
        }
    
        return rows.map((row) => {
            return(
                <div
                    className={styles.calendarMonthBodyRow}
                >
                    {row}
                </div>
            )
        })
    }

    return (
        <div className={styles.calendarMonth}>
            <div className={styles.calendarMonthWeekList}>
                {
                    weekList.map((week) => (
                        <div                                    
                            className={styles.calendarMonthWeekListItem}
                            key={week}
                        >
                            {CalendarLocale.week[week]}
                        </div>
                    ))
                }
            </div>

            <div className={styles.calendarMonthBody}>
                {
                    renderDays(
                        allDays,
                        // dateRender,
                        // dateInnerContent,
                        // value,
                        // selectHandler
                    )
                }
            </div>
        </div>
    )
}

export default MonthCalendar