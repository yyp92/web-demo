import {
    FC,
    PropsWithChildren,
    createContext,
    useContext,
    useState
} from "react"

// * 会造成多余的渲染
// interface ContextType {
//     aaa: number;
//     bbb: number;
//     setAaa: (aaa: number) => void;
//     setBbb: (bbb: number) => void;
// }

// const context = createContext<ContextType>({
//     aaa: 0,
//     bbb: 0,
//     setAaa: () => {},
//     setBbb: () => {}
// })

// const Provider: FC<PropsWithChildren> = ({ children }) => {
//     const [aaa, setAaa] = useState(0)
//     const [bbb, setBbb] = useState(0)

//     return (
//         <context.Provider
//             value={{
//                 aaa,
//                 bbb,
//                 setAaa,
//                 setBbb
//             }}
//         >
//             {children}
//         </context.Provider>
//     )
// }



// * 解决方法就是使用拆分的context
interface AaaContextType {
    aaa: number;
    setAaa: (aaa: number) => void;
}

const aaaContext = createContext<AaaContextType>({
    aaa: 0,
    setAaa: () => {}
})

interface BbbContextType {
    bbb: number;
    setBbb: (bbb: number) => void;
}

const bbbContext = createContext<BbbContextType>({
    bbb: 0,
    setBbb: () => {}
})

const AaaProvider: FC<PropsWithChildren> = ({ children }) => {
    const [aaa, setAaa] = useState(0)
  
    return (
        <aaaContext.Provider
            value={{
            aaa,
            setAaa
            }}
        >
            {children}
        </aaaContext.Provider>
    )
}

const BbbProvider: FC<PropsWithChildren> = ({ children }) => {
    const [bbb, setBbb] = useState(0)
  
    return (
        <bbbContext.Provider
            value={{
            bbb,
            setBbb
            }}
        >
            {children}
        </bbbContext.Provider>
    )
}



const Aaa = () => {
    // const { aaa, setAaa } = useContext(context)
    const { aaa, setAaa } = useContext(aaaContext)
    
    console.log('Aaa render...')
  
    return (
        <div>
            aaa: {aaa}
            
            <button onClick={() => setAaa(aaa + 1)}>加一</button>
        </div>
    )
}
  
const Bbb = () => {
    // const { bbb, setBbb } = useContext(context)
    const { bbb, setBbb } = useContext(bbbContext)
    
    console.log("Bbb render...")
    
    return (
        <div>
            bbb: {bbb}

            <button onClick={() => setBbb(bbb + 1)}>加一</button>
        </div>
    )
}
  

export const ContextPerformance = () => {
    return (
        // <Provider>
        //     <Aaa />
        //     <Bbb />
        // </Provider>

        <AaaProvider>
            <BbbProvider>
                <Aaa />
                <Bbb />
            </BbbProvider>
        </AaaProvider>
    )
}
