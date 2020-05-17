import React from 'react';
import CharCodes from '../../constants/CharCodes';

/**
 *
 * @author Ilya Pikin
 */

export type InputProps = {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onEnterPress?: () => void,
};

export type InputState = {
    isValid: boolean,
    isDisabled: boolean,
};

export abstract class FormInput extends React.Component<InputProps, InputState> {
    protected readonly inputElement = React.createRef<HTMLInputElement>();

    constructor(props: InputProps) {
        super(props);

        this.state = {
            isValid: true,
            isDisabled: false,
        };
    }

    public setValid(value: boolean): void {
        this.setState({
            isValid: value,
        });
    }

    public setDisabled(value: boolean): void {
        this.setState({
            isDisabled: value,
        });
    }

    public clear(): void {
        this.inputElement.current!.value = '';
    }

    public getValue(): string {
        return this.inputElement.current!.value;
    }

    public isValid(): boolean {
        return this.state.isValid;
    }

    public abstract validate(): boolean;

    protected readonly onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.validate();
        if (this.props.onChange) { this.props.onChange(event); }
    }

    protected readonly onKeyPress = (event: React.KeyboardEvent) => {
        if (event.charCode === CharCodes.RETURN ||
            event.charCode === CharCodes.ENTER) {
            event.preventDefault();
            if (this.props.onEnterPress) { this.props.onEnterPress(); }
        }
    }
}
