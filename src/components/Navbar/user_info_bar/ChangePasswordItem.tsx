import React from 'react';
import { Link } from 'react-router-dom';
import { UserCredentials } from '../../../store/user/UserCredentials';

/**
 *
 * @author Ilya Pikin
 */

const ChangePasswordItem: React.FunctionComponent<{ userCredentials: UserCredentials }> = (props) => {

    return (
        <>
            {props.userCredentials.authorizationGranted &&
                (<li><Link to='/change_password'>
                    Change Password</Link></li>)}
        </>
    );
};

export default ChangePasswordItem;
