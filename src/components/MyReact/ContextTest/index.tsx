import { createContext, useContext } from 'react'


const countContext = createContext(111);

function Bbb() {
    return <div><Ccc></Ccc></div>
}

function Ccc() {
    const count = useContext(countContext)
    
    return <h2>context 的值为：{count}</h2>
}

export const ContextTest = () => {
    return (
        <div>
            <countContext.Provider value={222}>
                <Bbb></Bbb>
            </countContext.Provider>
        </div>
    )
}