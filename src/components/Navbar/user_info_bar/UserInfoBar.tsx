import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/Store';
import { UserCredentials } from '../../../store/user/UserCredentials';
import { Dropdown } from 'materialize-css';
import LogInLogOutItem from './LogInLogOutItem';
import ChangePasswordItem from './ChangePasswordItem';

/**
 *
 * @author Ilya Pikin
 */

const UserInfoBar: React.FunctionComponent = () => {
    const userCredentials: UserCredentials = useSelector((state: ApplicationState) => state.userCredentials);
    const personDropdown = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (personDropdown.current) {
            Dropdown.init(personDropdown.current, {
                coverTrigger: false,
            });
        }
    });

    if (userCredentials.refreshToken && !userCredentials.login) {
        return null;
    } else {
        return (
            <>
                <span className='right padding-right dropdown-trigger' data-target='person-dropdown' ref={personDropdown}>
                    {userCredentials.authorizationGranted ? userCredentials.login : 'Guest'}
                    <i className='material-icons right'>
                        {userCredentials.authorizationGranted ? 'person' : 'person_outline'}
                    </i></span>
                <ul id='person-dropdown' className='dropdown-content'>
                    <LogInLogOutItem userCredentials={userCredentials} />
                    <ChangePasswordItem userCredentials={userCredentials} />
                </ul>
            </>
        );
    }
};

export default UserInfoBar;
