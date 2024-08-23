import { Button, Input } from 'antd'
import { useFocus } from './useFocus'

export const UseFocus = () => {
    const [inputRef, focusInput] = useFocus()

    return (
        <div>
            <h2 style={{marginBottom: '20px'}}>UseFocus</h2>

            <div>
                <Input ref={inputRef} />

                <Button
                    style={{marginTop: '10px'}}
                    type="primary"
                    onClick={focusInput as any}
                >Focus Input</Button>
            </div>
        </div>
    )
}
