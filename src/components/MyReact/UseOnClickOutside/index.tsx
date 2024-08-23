import {useRef} from 'react'
import { useOnClickOutside } from './useOnClickOutside';
import {message} from 'antd'

export const UseOnClickOutside = () => {
    const ref = useRef(null)

    const onClose = () => {
        message.success("clicked outside")
    }

    useOnClickOutside(ref, onClose)

    return (
        <div>
            <h2 style={{marginBottom: '20px'}}>UseOnClickOutside</h2>

            <div
                ref={ref}
                style={{border: '1px solid blue'}}
            >
                Click outside this element to close
            </div>
        </div>
    )
}
