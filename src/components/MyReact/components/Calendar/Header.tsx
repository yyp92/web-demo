import {useContext} from 'react'
import {Dayjs} from 'dayjs'
import styles from './index.module.scss'
import LocaleContext from './LocaleContext'
import allLocales from './locale'


interface HeaderProps {
    curMonth: Dayjs
    preMonthHandler: () => void
    nextMonthHandler: () => void
    todayHandler: () => void
}

function Header(props: HeaderProps) {
    const {
        curMonth,
        preMonthHandler,
        nextMonthHandler,
        todayHandler
    } = props

    // 国际化
    const localeContext = useContext(LocaleContext)
    const CalendarContext = allLocales[localeContext.locale]

    return (
        <div className={styles.calendarHeader}>
            <div className={styles.calendarHeaderLeft}>
                <div
                    className={styles.calendarHeaderIcon}
                    onClick={preMonthHandler}
                >&lt;</div>

                <div className={styles.calendarHeaderValue}>{curMonth.format(CalendarContext.formatMonth)}</div>

                <div
                    className={styles.calendarHeaderIcon}
                    onClick={nextMonthHandler}
                >&gt;</div>

                <button
                    className={styles.calendarHeaderBtn}
                    onClick={todayHandler}
                >{CalendarContext.today}</button>
            </div>
        </div>
    )
}

export default Header