import { useWindowSize } from "./useWindowSize";

export const UseWindowSize = () => {
    const { width, height } = useWindowSize()

    return (
        <div>
            <h2 style={{marginBottom: '20px'}}>UseWindowSize</h2>

            <p>Window Width: {width}</p>
            <p>Window Height: {height}</p>
        </div>
    )
}

