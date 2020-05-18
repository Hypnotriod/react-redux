import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogInAction } from '../../../store/user/UserCredentialsActions';
import { ApplicationState } from '../../../store/Store';
import { UserCredentials } from '../../../store/user/UserCredentials';
import { useHistory } from 'react-router-dom';
import PasswordFormInput from '../../forms/PasswordFormInput';
import LoginFormInput from '../../forms/LoginFormInput';

/**
 *
 * @author Ilya Pikin
 */

const LoginPage: React.FunctionComponent = () => {

    const userCredentials: UserCredentials = useSelector((state: ApplicationState) => state.userCredentials);
    const dispatch = useDispatch();
    const history = useHistory();
    const loginInput = useRef<LoginFormInput>(null);
    const passwordInput = useRef<PasswordFormInput>(null);

    useEffect(() => {
        if (userCredentials.authorizationGranted) {
            history.push('/');
        }
        if (userCredentials.authenticationError) {
            loginInput.current!.setDisabled(false);
            loginInput.current!.setValid(false);
            passwordInput.current!.clear();
            passwordInput.current!.setValid(false);
            passwordInput.current!.setDisabled(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCredentials]);

    const onEnterPress = () => {
        const validateLoginResult = loginInput.current!.validate();
        const validatePasswordResult = passwordInput.current!.validate();

        if (validateLoginResult && validatePasswordResult) {
            loginInput.current!.setDisabled(true);
            passwordInput.current!.setDisabled(true);
            dispatch(
                userLogInAction(
                    loginInput.current!.getValue(),
                    passwordInput.current!.getValue()));
        }
    };

    if (userCredentials.refreshToken && !userCredentials.login) {
        return (
            <div className='section'>Trying to log you back...</div>
        );
    } else {
        return (
            <div className='section'>
                <h5 className='center-align'>Log In</h5>
                <form className='col s12'>
                    <div className='row'>
                        <div className='input-field col s6'>
                            <label>Login</label>
                            <LoginFormInput
                                onEnterPress={onEnterPress}
                                ref={loginInput} />
                        </div>
                        <div className='input-field col s6' >
                            <label>Password</label>
                            <PasswordFormInput
                                onEnterPress={onEnterPress}
                                ref={passwordInput} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};

export default LoginPage;
