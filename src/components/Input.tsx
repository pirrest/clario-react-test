import styled, {css} from "styled-components";

const Input = styled.input<{$error?: boolean; $complete?: boolean;}>`
  display: block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  background: #FFFFFF;
  color: #4A4E71;
  font-size: 18px;
  font-weight: 400;
  horiz-align: center;
  padding: 8px;
  gap: 10px;
  border-color: #FFFFFF;
  border-width: 1px;
  border-style: solid;
  outline: none;
  width: 100%;
  height: 48px;
  border-radius: 10px;
  text-indent: 10px;

  &::placeholder {
    color: #6F91BC;
    opacity: 1.0;
  }

  &:focus {
    border-color: #6F91BC;
    border-width: 1px;
    transition: border-color 0.3s ease-in-out;
  }

  ${props => props.$error && !props.$complete && css`
    color: #FF8080;
    border-color: #FF8080;
    background-color: #FDEFEE;
    transition: border-color 0.3s ease-in-out;
  `}
  ${props => props.$complete && css`
    color: #27B274;
    border-color: #27B274;
    transition: border-color 0.3s ease-in-out;
  `}
`;
export default Input;