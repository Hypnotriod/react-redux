
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
    PRODUCTS_GET_ALL,
}

export default StoreActionTypes;
