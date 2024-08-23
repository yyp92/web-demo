import React, { useState, useEffect } from "react";

export const useLocalStorage = (key: string, initialValue: any) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)

            return item
                ? JSON.parse(item)
                : initialValue
        }
        catch (error) {
            console.error(error)

            return initialValue
        }
    })

    const setValue = (value: any) => {
        try {
            const valueToStore = value instanceof Function
                ? value(storedValue)
                : value

            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
        catch (error) {
            console.error(error)
        }
    }

    // 监听 storage 事件，这样就可以通过更改开发者工具就可以直接反应到页面上
    useEffect(() => {
        const handleStorageChange = () => {
            try {
                const item = window.localStorage.getItem(key)

                setStoredValue(item ? JSON.parse(item) : initialValue)
            }
            catch (error) {
                console.error(error)
            }
        }

        window.addEventListener("storage", handleStorageChange)

        return () => {
            window.removeEventListener("storage", handleStorageChange)
        }
    }, [key, initialValue])

    return [storedValue, setValue]
}