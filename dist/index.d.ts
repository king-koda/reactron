declare global {
    interface Window {
        send: any;
        receive: any;
        electronAPI: {
            openFile: () => any;
            walkFs: () => Promise<any>;
            getPhotos: (string: any) => Promise<any>;
        };
    }
}
export {};
