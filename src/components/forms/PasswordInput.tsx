import React from 'react';
import PasswordValidator from 'password-validator';
import { LOGIN_MIN_LENGTH, LOGIN_MAX_LENGTH } from '../../constants/API';
import { FormInput, InputProps } from './FormInput';

/**
 *
 * @author Ilya Pikin
 */

export default class PasswordInput extends FormInput {

    private readonly passwordvalidator: PasswordValidator;

    constructor(props: InputProps) {
        super(props);
        this.passwordvalidator = new PasswordValidator()
            .is().min(LOGIN_MIN_LENGTH)
            .is().max(LOGIN_MAX_LENGTH);
    }

    public readonly validate = (): boolean => {
        const result = Boolean(this.passwordvalidator.validate(this.getValue()));
        this.setValid(result);
        return result;
    }

    public render(): JSX.Element {
        return (
            <input className={this.state.isValid ? '' : 'invalid'}
                type='password'
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                disabled={this.state.isDisabled}
                ref={this.inputElement} />
        );
    }
}
