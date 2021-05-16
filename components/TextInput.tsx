import { KeyboardEvent } from 'react';
import { AbstractControl } from 'react-reactive-form';
import TextField from '@material-ui/core/TextField';

interface TextInputProps extends AbstractControl {
    meta: {
        required?: boolean;
        onKeyUp?: (e: any) => void;
        [key: string]: any
    }
}

export function TextInput({ handler, hasError, invalid, touched, meta }: TextInputProps) {
    let errorMessage = '';

    if (touched) {
        if (hasError('required')) {
            errorMessage = `${meta?.label} is required`;
        }
    }
    
    return (
        <div>
            <TextField
                id="username"
                type="text"
                label={`Enter ${meta?.label}`}
                variant="outlined"
                required={meta?.required}
                error={touched && invalid}
                helperText={errorMessage}
                onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => meta?.onKeyUp && meta?.onKeyUp(e)}
                {...handler()} />
        </div>
    );
}
