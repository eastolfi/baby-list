import TextField from '@material-ui/core/TextField';
import { AbstractControl } from 'react-reactive-form';

interface TextInputProps extends AbstractControl {
    required?: boolean;
}

export function TextInput({ handler, hasError, touched, meta, required, invalid }: TextInputProps) {
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
                label={`Enter ${meta?.label}`}
                variant="outlined"
                required={required}
                error={touched && invalid}
                helperText={errorMessage}
                {...handler()} />
        </div>
    );
}