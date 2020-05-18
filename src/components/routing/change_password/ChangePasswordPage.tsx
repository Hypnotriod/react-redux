import React, { useRef, useEffect } from 'react';
import PasswordFormInput from '../../forms/PasswordFormInput';
import { UserCredentials } from '../../../store/user/UserCredentials';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/Store';
import { useHistory } from 'react-router-dom';

/**
 *
 * @author Ilya Pikin
 */

const ChangePasswordPage: React.FunctionComponent = () => {

    const userCredentials: UserCredentials = useSelector((state: ApplicationState) => state.userCredentials);
    const history = useHistory();
    const oldPassword = useRef<PasswordFormInput>(null);
    const newPassword = useRef<PasswordFormInput>(null);
    const retypeNewPassword = useRef<PasswordFormInput>(null);

    useEffect(() => {
        if (!userCredentials.authorizationGranted && !userCredentials.refreshToken) {
            history.push('/');
        }
    }, [userCredentials, history]);

    const newPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (newPassword.current!.getValue() !== retypeNewPassword.current!.getValue()) {
            retypeNewPassword.current!.setValid(false);
        }
    };

    const onEnterPress = () => {
        const validateOldPasswordResult = oldPassword.current!.validate();
        const validateNewPasswordResult = newPassword.current!.validate();
        const validateRetyprNewPasswordResult = retypeNewPassword.current!.validate();

        if (validateOldPasswordResult && validateNewPasswordResult && validateRetyprNewPasswordResult) {
            // todo
        }
    };

    return (
        <div className='section'>
            <h5 className='center-align'>Change password</h5>
            <form className='col s12'>
                <div className='row'>
                    <div className='input-field col s6'>
                        <label>Old password</label>
                        <PasswordFormInput
                            onEnterPress={onEnterPress}
                            ref={oldPassword} />
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s6'>
                        <label>New password</label>
                        <PasswordFormInput
                            onEnterPress={onEnterPress}
                            onChange={newPasswordChange}
                            ref={newPassword} />
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field col s6'>
                        <label>Retype new password</label>
                        <PasswordFormInput
                            onEnterPress={onEnterPress}
                            onChange={newPasswordChange}
                            ref={retypeNewPassword} />
                    </div>
                </div>
            </form>
        </div >
    );
};

export default ChangePasswordPage;
