
/**
 *
 * @author Ilya Pikin
 */

export type StoreAction<T extends StoreActionTypes, P> = {
    type: T,
    payload: P,
};

enum StoreActionTypes {
    USER_LOGIN,
    USER_LOGOUT,
    USER_REFRESH_TOKEN,
}

export default StoreActionTypes;
