import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store/Store';
import { UserCredentials } from '../../store/user/UserCredentials';
import { userLogOutAction } from '../../store/user/UserCredentialsActions';

/**
 *
 * @author Ilya Pikin
 */

const UserInfoBar: React.FunctionComponent = () => {
    const userCredentials: UserCredentials = useSelector((state: ApplicationState) => state.userCredentials);
    const dispatch = useDispatch();

    const onLogOut = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(userLogOutAction(
            userCredentials.authenticationToken!,
            userCredentials.refreshToken!,
        ));
    };

    if (userCredentials.refreshToken && !userCredentials.login) {
        return null;
    } else if (userCredentials.authorizationGranted) {
        return (
            <>
                <ul id='nav-mobile' className='right'>
                    <a href='/' onClick={onLogOut}>Log Out</a>
                </ul>
                <span className='right padding-right'>{userCredentials.login}
                    <i className='material-icons right'>person</i></span>
            </>
        );
    } else {
        return (
            <>
                <ul id='nav-mobile' className='right'>
                    <Link to='/login'>Log In</Link>
                </ul>
                <span className='right padding-right'>Guest
                        <i className='material-icons right'>person_outline</i></span>
            </>
        );
    }
};

export default UserInfoBar;