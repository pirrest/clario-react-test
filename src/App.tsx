import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import './App.css';
import backgroundSvg from './assets/background.svg';
import Input from "./components/Input";
import SmallLabel from "./components/SmallLabel";
import Button from "./components/Button";
import Header from "./components/Header";
import PasswordInput from "./components/PasswordInput";

interface FormState {
    email: string;
    password: string;
}

function App() {
    const [formState, setFormState] = useState<FormState>({email: '', password: ''});
    const [emailError, setEmailError] = useState<string>('');

    const [isErrorsVisible, setErrorsVisible] = useState<boolean>(false);

    const [isPasswordValid, setPasswordValid] = useState<boolean>(false);
    const [isPassword8CharsOrMore, setPasswordIs8CharsOrMore] = useState<boolean>(false);
    const [isPasswordBothCases, setPasswordBothCases] = useState<boolean>(false);
    const [isPasswordDigit, setPasswordDigit] = useState<boolean>(false);
    const [isEmailValid, setEmailValid] = useState<boolean>(false);

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        email = email.toLowerCase().trim();
        setEmailValid(re.test(email));
        return isEmailValid;
    };

    const validatePassword = (password: string): boolean => {
        const spaceRegexp = /\s/;
        const uppercaseRegexp = /[A-Z]/;
        const lowercaseRegexp = /[a-z]/;
        const digitRegexp = /\d/;
        const hasSpaces = spaceRegexp.test(password);
        const validLength = password.length >= 8 && password.length <= 64;
        setPasswordIs8CharsOrMore(!hasSpaces && validLength);

        const hasUppercase = uppercaseRegexp.test(password);
        const hasLowercase = lowercaseRegexp.test(password);
        setPasswordBothCases(hasUppercase && hasLowercase);

        const hasDigit = digitRegexp.test(password);
        setPasswordDigit(hasDigit);

        setPasswordValid(isPassword8CharsOrMore && isPasswordBothCases && isPasswordDigit);

        return isPasswordValid;
    };

    // Handle form field changes
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setErrorsVisible(false);
        const {name, value} = e.target;
        setFormState((prevState) => ({...prevState, [name]: value}));
        validatePassword(value);
    };
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setErrorsVisible(false);
        const {name, value} = e.target;
        setFormState((prevState) => ({...prevState, [name]: value}));
        validateEmail(value);
    };

    // Handle form submission
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorsVisible(false);

        const isEmailValid = validateEmail(formState.email);
        const isPasswordValid = validatePassword(formState.password);

        if (!isEmailValid || !isPasswordValid) {
            setErrorsVisible(true);
            return;
        }

        alert('Sign up success!');
    };

    return (
        <div className="App">
            <div style={{
                maxWidth: '315px',
                margin: 'auto',
                marginTop: '20px',
                paddingTop: '150px',
                padding: '94px 30px 0px 30px',
                background: `url(${backgroundSvg})`,
                height: '100vh',
            }}>
                <Header>Sign up</Header>
                <form key="form" onSubmit={onSubmit}>
                    <div key="emailDiv" style={{paddingBottom: '20px'}}>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            key="email"
                            placeholder="Email"
                            value={formState.email}
                            $complete={isEmailValid}
                            $error={isErrorsVisible && !isEmailValid}
                            onChange={onEmailChange}
                        />
                        {isErrorsVisible && !isEmailValid &&
                          <ul style={{padding: 0, paddingLeft: '20px'}}><SmallLabel $error={true}>Email is not
                            valid</SmallLabel></ul>}
                    </div>
                    <PasswordInput
                        value={formState.password}
                        complete={isPasswordValid}
                        error={isErrorsVisible && !isPasswordValid}
                        onChange={onPasswordChange}
                    />
                    <ul style={{padding: 0, paddingLeft: '20px', paddingBottom: '20px'}}>
                        <SmallLabel style={{paddingBottom: '4px'}} $error={isErrorsVisible && !isPassword8CharsOrMore}
                                    $complete={isPassword8CharsOrMore}>From 8 to 64 characters (no spaces)</SmallLabel>
                        <SmallLabel style={{paddingBottom: '4px'}} $error={isErrorsVisible && !isPasswordBothCases}
                                    $complete={isPasswordBothCases}>Uppercase and lowercase letters</SmallLabel>
                        <SmallLabel style={{paddingBottom: '4px'}} $error={isErrorsVisible && !isPasswordDigit}
                                    $complete={isPasswordDigit}>At least one digit</SmallLabel>
                    </ul>
                    <Button type="submit">Sign up</Button>
                </form>
            </div>
        </div>
    );
}

export default App;
