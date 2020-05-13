export interface UserState {
    authenticationToken: string | null;
    refreshToken: string | null;
    login: string | null;
    authorizationGranted: boolean;
    authenticationError: boolean;
}
