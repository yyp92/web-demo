/**
 * * 并发请求
 */
import React, { useEffect } from 'react'
import {handQueue} from './utils'

export const ConcurrencyRequest = () => {
    useEffect(() => {
        handQueue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    }, [])

    return (
        <h2>并发请求</h2>
    )
}
