import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogOutAction } from '../../../store/user/UserCredentialsActions';
import { UserCredentials } from '../../../store/user/UserCredentials';

/**
 *
 * @author Ilya Pikin
 */

const LogInLogOutItem: React.FunctionComponent<{ userCredentials: UserCredentials }> = (props) => {

    const dispatch = useDispatch();

    const onLogOut = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(userLogOutAction(
            props.userCredentials.authenticationToken!,
            props.userCredentials.refreshToken!,
        ));
    };

    return (
        <>
            {props.userCredentials.authorizationGranted ?
                (<li><Link to='/' onClick={onLogOut}>
                    <i className='material-icons'>exit_to_app</i>
                    Logout</Link></li>) :
                (<li><Link to='/login'>
                    <i className='material-icons'>lock_outline</i>
                    Log In</Link></li>)}
        </>
    );
};

export default LogInLogOutItem;
