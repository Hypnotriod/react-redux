import { UserState } from './UserState';
import { UserActions } from './UserActions';

const userReducer = (state: UserState = {
    authenticationToken: null,
    refreshToken: null,
    login: null,
},
    action: UserActions): UserState => {
    switch (action) {
        default: return state;
    }
};

export default userReducer;
