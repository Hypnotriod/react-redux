import React, { useState, useRef, useEffect } from 'react';
import PasswordValidator from 'password-validator';
import { LOGIN_VALIDATION_REGEXP } from '../../../constants/Regexp';
import CharCodes from '../../../constants/CharCodes';
import { LOGIN_MIN_LENGTH, LOGIN_MAX_LENGTH } from '../../../constants/API';
import { useDispatch, useSelector } from 'react-redux';
import { userLogInAction } from '../../../store/user/UserActions';
import { ApplicationState } from '../../../store/Store';
import { UserState } from '../../../store/user/UserState';

const Login: React.FunctionComponent = () => {

    const userState: UserState = useSelector((state: ApplicationState) => state.userState);
    const dispatch = useDispatch();
    const [isDisabled, setDisabled] = useState(false);
    const [isLoginValid, setLoginValid] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);
    const loginInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const passwordvalidator = new PasswordValidator()
        .is().min(LOGIN_MIN_LENGTH)
        .is().max(LOGIN_MAX_LENGTH);

    useEffect(() => {
        if (userState.authenticationError) {
            setDisabled(false);
            passwordInput.current!.value = '';
            setLoginValid(false);
            setPasswordValid(false);
        }
    }, [userState]);

    const validateLogin = (): boolean => {
        const loginInputValue = loginInput.current!.value;
        const result = LOGIN_VALIDATION_REGEXP.test(loginInputValue);
        setLoginValid(result);
        return result;
    };

    const validatePassword = (): boolean => {
        const passwordInputValue = passwordInput.current!.value;
        const result = Boolean(passwordvalidator.validate(passwordInputValue));
        setPasswordValid(result);
        return result;
    };

    const onLoginChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
        validateLogin();
    };

    const onPasswordChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
        validatePassword();
    };

    const onKeyPress = (event: React.KeyboardEvent) => {
        if (event.charCode === CharCodes.RETURN ||
            event.charCode === CharCodes.ENTER) {
            event.preventDefault();
            const validateLoginResult = validateLogin();
            const validatePasswordResult = validatePassword();

            if (validateLoginResult && validatePasswordResult) {
                setDisabled(true);
                dispatch(
                    userLogInAction(
                        loginInput.current!.value,
                        passwordInput.current!.value));
            }
        }
    };

    return (
        <div className='section'>
            <h5 className='center-align'>Log In</h5>
            <form className='col s12'>
                <div className='row'>
                    <div className='input-field col s6'>
                        <label>Login</label>
                        <input className={isLoginValid ? '' : 'invalid'}
                            type='text'
                            onChange={onLoginChnage}
                            onKeyPress={onKeyPress}
                            disabled={isDisabled}
                            ref={loginInput} />
                    </div>
                    <div className='input-field col s6' >
                        <label>Password</label>
                        <input className={isPasswordValid ? '' : 'invalid'}
                            type='password'
                            onChange={onPasswordChnage}
                            onKeyPress={onKeyPress}
                            disabled={isDisabled}
                            ref={passwordInput} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
