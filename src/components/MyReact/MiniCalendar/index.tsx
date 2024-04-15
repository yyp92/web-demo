import {useEffect, useRef} from 'react'
import MiniCalendar, {CalendarRef} from '../components/MiniCalendar'

import styles from './index.module.scss'

export const MiniCalendarTest = () => {
    const calenderRef = useRef<CalendarRef>(null)

    useEffect(() => {
        console.log(calenderRef.current?.getDate().toLocaleDateString())

        setTimeout(() => {
            calenderRef.current?.setDate(new Date(2024, 3, 1))
        }, 3000)
    }, [])


    return (
        <div
            // style={{
            //     display: 'flex',
            //     justifyContent: 'space-between'
            // }}
        >
            {/* <Calendar
                value={new Date('2023-3-1')}
                onChange={(date: Date) => {
                    alert(date.toLocaleDateString())
                }}
            /> */}

            <MiniCalendar
                ref={calenderRef}
                value={new Date('2024-8-15')}
            />
        </div>
    )
}