import React from 'react'
import dayjs from 'dayjs'
import Calendar from '../components/Calendar'

export const CalendarTest = () => {
    return (
        <div>
            <Calendar
                value={dayjs('2023-11-08')}
                onChange={(date) => {
                    // alert(date.format('YYYY-MM-DD'))
                }}

                // locale="en-US"

                // dateRender={(value) => {
                //     return (
                //         <div>
                //             <p
                //                 style={{
                //                     background: 'yellowgreen',
                //                     height: '30px'
                //                 }}
                //             >
                //                 {value.format('YYYY/MM/DD')}
                //             </p>
                //         </div>
                //     )
                // }}
            />
        </div>
    )
}