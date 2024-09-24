import styled, {css} from "styled-components";
import React, {ChangeEvent, useState} from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import Input from "./Input";

const InputWrapper = styled.div`
  position: relative;
`;

const ShowPasswordButton = styled.button<{$error?: boolean; $complete?: boolean;}>`
  position: absolute;
  top: 53%;
  right: 16px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6F91BC;
  ${props => props.$error && !props.$complete && css`
    color: #FF8080;
    transition: border-color 0.3s ease-in-out;
  `}
  ${props => props.$complete && css`
    color: #27B274;
    transition: border-color 0.3s ease-in-out;
  `}
`;
const PasswordInput = ({
                           value,
                           onChange,
                           complete,
                           error,
                       }: { value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, complete: boolean, error: boolean, }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <InputWrapper>
            <Input
                id="password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                style={{paddingRight: '30px'}}
                onChange={onChange}
                placeholder="Create your password"
                $complete={complete}
                $error={error}
            />
            <ShowPasswordButton type="button" $complete={complete} $error={error} onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
            </ShowPasswordButton>
        </InputWrapper>
    );
};
export default PasswordInput;