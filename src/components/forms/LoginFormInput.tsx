import React from 'react';
import { LOGIN_VALIDATION_REGEXP } from '../../constants/Regexp';
import { FormInput } from './FormInput';

/**
 *
 * @author Ilya Pikin
 */

export default class LoginFormInput extends FormInput {

    public readonly validate = (): boolean => {
        const result = LOGIN_VALIDATION_REGEXP.test(this.getValue());
        this.setValid(result);
        return result;
    }

    public render(): JSX.Element {
        return (
            <input className={this.state.isValid ? '' : 'invalid'}
                type='text'
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                disabled={this.state.isDisabled}
                ref={this.inputElement} />
        );
    }
}
