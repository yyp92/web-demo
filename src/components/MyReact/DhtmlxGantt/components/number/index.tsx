import React, { useRef } from "react";
import { InputNumber } from "antd";

export default function CustomNumber(props: any) {
    const {
        // show,
        style,
        value,
        afterBlur,
        onChange,
        durationMax,
        config: {
            min,
            formatType
        }
    } = props

    const formatMap: any = {
        date: {
            formatter: dateFormat,
            parser: dateParser
        }
    }

    const inputRef = useRef()

    function handleChange(val: any) {
        onChange(val)
        afterBlur(val)
    }

    function dateFormat(number: any) {
        return `${number} 天`
    }

    function dateParser(str: any) {
        if (!str) return

        const num = str.slice(0, -2)

        return Number(num)
    }

    return (
        <InputNumber
            {...props}
            inputRef={inputRef}
            style={style}
            value={value}
            onChange={handleChange}
            min={min}
            max={durationMax}
            formatter={formatMap[formatType]?.formatter}
            parser={formatMap[formatType]?.parser}
        // onBlur={handleBlur}
        />
    );
}
