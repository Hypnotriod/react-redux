
/**
 *
 * @author Ilya Pikin
 */

 export interface UserCredentials {
    authenticationToken: string | null;
    refreshToken: string | null;
    login: string | null;
    authorizationGranted: boolean;
    authenticationError: boolean;
}
