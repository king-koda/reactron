declare global {
    interface Window {
        send: any;
        receive: any;
        electronAPI: {
            openFile: () => any;
            walkFs: () => Promise<any>;
            getHtKeys: () => any;
        };
    }
}
export {};
