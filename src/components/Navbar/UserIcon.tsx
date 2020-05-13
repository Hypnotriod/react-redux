import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store/Store';
import { UserState } from '../../store/user/UserState';
import { userLogOutAction } from '../../store/user/UserActions';

const UserIcon: React.FunctionComponent = () => {
    const userState: UserState = useSelector((state: ApplicationState) => state.userState);
    const dispatch = useDispatch();

    const onLogOut = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(userLogOutAction(
            userState.authenticationToken!,
            userState.refreshToken!,
        ));
    };

    return (
        <>
            {userState.authorizationGranted
                ?
                <>
                    <ul id='nav-mobile' className='right'>
                        <a href='/' onClick={onLogOut}>Log Out</a>
                    </ul>
                    <Link to='' className='right padding-right'>{userState.login}
                        <i className='material-icons timy right'>person</i></Link>
                </>
                :
                <ul id='nav-mobile' className='right'>
                    <Link to='/'>Log In</Link>
                </ul>
            }
        </>
    );
};

export default UserIcon;
