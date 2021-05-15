import { SyntheticEvent } from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AbstractControl, FieldControl, FieldGroup, FormBuilder, Validators } from 'react-reactive-form';
import { TextInput } from '../TextInput';

type FormProps = {
    onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
    errorMessage: string;
}

const ErrorMsg = styled.p`
    color: brown;
    margin: 1rem 0 0;
`;

export default function LoginForm({ onSubmit, errorMessage }: FormProps) {
    const form = FormBuilder.group({
        username: ['', Validators.required]
    });

    return (
        <FieldGroup
            control={form}
            render={({ invalid }: AbstractControl) => (
                <form className="flex flex-col space-y-2" onSubmit={ onSubmit }>
                    <Typography variant="subtitle1" >
                        <legend>Login</legend>
                    </Typography>

                    <FieldControl name="username" render={TextInput} meta={{ label: "Username" }} />

                    <Button type="submit" variant="contained" color="primary" disabled={invalid}>Login</Button>

                    { errorMessage && <ErrorMsg>{ errorMessage }</ErrorMsg> }
                </form>
            )}>
            
        </FieldGroup>
    )
}