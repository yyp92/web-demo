import React, { useRef } from "react";
import { Select } from "antd";

export default function CustomSelect(props: any) {
    const {
        // show,
        style,
        value,
        afterBlur,
        onChange,
        config: {
            originField,
            options = []
        }
    } = props

    const inputRef = useRef()

    function handleChange(val: any) {
        onChange(val)
        afterBlur(val)
    }

    return (
        <Select
            {...props}
            options={options}
            inputRef={inputRef}
            style={style}
            value={value}
            onChange={handleChange}
            allowClear={originField === "pre_task"}
            // onBlur={handleBlur}
        />
    )
}
