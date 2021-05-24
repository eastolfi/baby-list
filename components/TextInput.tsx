import { AbstractControl } from 'react-reactive-form';
import TextField from '@material-ui/core/TextField';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';

interface TextInputProps extends AbstractControl {
    meta: {
        required?: boolean;
        inputProps?: Partial<OutlinedInputProps>;
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
        <div className="w-full">
            <TextField
                id="username"
                type="text"
                className="w-full"
                label={`${meta?.label}`}
                variant="outlined"
                required={meta?.required}
                error={touched && invalid}
                helperText={errorMessage}
                InputProps={ meta.inputProps ? meta.inputProps : {} }
                {...handler()} />
        </div>
    );
}
