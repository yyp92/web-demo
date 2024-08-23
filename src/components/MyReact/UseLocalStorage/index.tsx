
import { Input } from "antd";
import { useLocalStorage } from "./useLocalStorage";


export const UseLocalStorage = () => {
    const [token, setToken] = useLocalStorage("tokenName", "")

    const handleTokenChange = (event: any) => {
        setToken(event.target.value)
    }

    return (
        <div>
            <h2 style={{marginBottom: '20px'}}>useLocalStorage</h2>

            <Input
                value={token}
                onChange={handleTokenChange}
                allowClear
            />
        </div>
    )
}
