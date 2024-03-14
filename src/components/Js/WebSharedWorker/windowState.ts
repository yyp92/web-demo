import {useId} from 'react'

export type WindowState = {
    // window.screenX
    screenX: number; 

    // window.screenY
    screenY: number; 

    // window.innerWidth
    width: number;

    // window.innerHeight 
    height: number; 
};

export interface WorkerMessage {
    type: string;
    payload: any;
}

const generateId = () => {
    return Math.random()
}

const getCurrentWindowState = () => {


    
    return {
        id: '',
        port: {},
        windowState: {
            screenX: window.screenX,
            screenY: window.screenY,
            width: window.innerWidth,
            height: window.innerHeight,
        }
    }
}


export {
    generateId,
    getCurrentWindowState,
}