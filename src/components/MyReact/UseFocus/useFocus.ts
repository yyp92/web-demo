import { useRef, useCallback } from "react"

export const useFocus = () => {
    const ref = useRef<any>(null)

    const focusElement = useCallback(() => {
        if (ref.current) {
            ref.current.focus()
        }
    }, [])

    return [ref, focusElement]
}