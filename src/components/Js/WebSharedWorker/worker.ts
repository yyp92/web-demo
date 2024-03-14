import {WindowState, WorkerMessage} from './windowState'


console.log("Worker is running");

let windows: {
    windowState: WindowState;
    id: number;
    port: MessagePort
}[] = [];
 
self.onconnect = function({ ports }: any) {
    const port = ports[0];

    port.onmessage = function (event: MessageEvent<WorkerMessage>) {
        const msg: any = event.data;
        console.log('====self', msg)
        
        switch (msg.action) {
            case "windowStateChanged": {
                const { id, newWindow } = msg.payload;
                const oldWindowIndex = windows.findIndex((w) => w.id === id);
                if (oldWindowIndex !== -1) {
                    // old one changed
                    windows[oldWindowIndex].windowState = newWindow;
                }
                else {
                    // new window 
                    windows.push({ id, windowState: newWindow, port });
                }
                
                windows.forEach((w) => {
                    w.port.postMessage({
                        action: "sync",
                        payload: { allWindows: JSON.parse(JSON.stringify(windows)) },
                    });
                });

                break;
            }
        }
    };
};