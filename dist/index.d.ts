declare global {
    interface Window {
        send: any;
        receive: any;
        electronAPI: {
            rootFolderSelect: () => any;
            walkFs: (path: string) => Promise<any>;
            getPhotos: (string: any) => Promise<any>;
        };
    }
}
export {};
