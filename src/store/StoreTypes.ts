export type StoreAction<T extends StoreActionTypes, P> = {
    type: T,
    payload?: P,
};

enum StoreActionTypes {
    USER_LOGIN,
}

export default StoreActionTypes;
