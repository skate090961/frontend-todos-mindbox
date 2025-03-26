export const createLocalStorageMock = () => {
    let store: Record<string, string> = {};

    return {
        getItem(key: string) {
            return store[key] ?? null;
        },
        setItem(key: string, value: string) {
            store[key] = value;
        },
        clear() {
            store = {};
        },
        removeItem(key: string) {
            delete store[key];
        },
    };
};

export const setupLocalStorageMock = () => {
    Object.defineProperty(window, 'localStorage', {
        value: createLocalStorageMock(),
        writable: true,
    });
};
