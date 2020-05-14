import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store/Store';
import { UserCredentials } from '../../store/user/UserCredentials';
import { userLogOutAction } from '../../store/user/UserActions';

const UserIcon: React.FunctionComponent = () => {
    const userCredentials: UserCredentials = useSelector((state: ApplicationState) => state.userCredentials);
    const dispatch = useDispatch();

    const onLogOut = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(userLogOutAction(
            userCredentials.authenticationToken!,
            userCredentials.refreshToken!,
        ));
    };

    return (
        <>
            {userCredentials.authorizationGranted
                ?
                <>
                    <ul id='nav-mobile' className='right'>
                        <a href='/' onClick={onLogOut}>Log Out</a>
                    </ul>
                    <Link to='/' className='right padding-right'>{userCredentials.login}
                        <i className='material-icons right'>person</i></Link>
                </>
                :
                <>
                    <ul id='nav-mobile' className='right'>
                        <Link to='/login'>Log In</Link>
                    </ul>
                    <Link to='/' className='right padding-right'>Guest
                        <i className='material-icons right'>person_outline</i></Link>
                </>
            }
        </>
    );
};

export default UserIcon;
