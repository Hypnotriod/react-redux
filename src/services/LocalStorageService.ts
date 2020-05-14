
/**
 *
 * @author Ilya Pikin
 */

class LocalStorageService {
    public save<T>(state: T, key: string): T {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem(key, serializedState);
        } finally {
            return state;
        }
    }

    public get<T>(defautValue: T, key: string): T {
        try {
            const serializedState = localStorage.getItem(key);
            if (serializedState === null) {
                return defautValue;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return defautValue;
        }
    }
}

export default new LocalStorageService();
