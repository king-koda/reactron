declare global {
    interface Window {
        send: any;
        receive: any;
        electronAPI: {
            openFile: () => any;
        };
    }
}
export {};
