import HttpStatusCode from '../constants/HttpStatusCode';

/**
 *
 * @author Ilya Pikin
 */

export default interface ServerResponseResult {
    httpStatusCode: HttpStatusCode;
    authorizationGranted: boolean;
    data?: object | object[] | null;
    errorDescription?: string;
}
