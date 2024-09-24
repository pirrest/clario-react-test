import styled, {css} from "styled-components";

const SmallLabel = styled.li<{ $error?: boolean; $complete?: boolean; }>`
  color: #4A4E71;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${props => props.$error && css`
    color: #FF8080;
  `}
  ${props => props.$complete && css`
    color: #27B274;
  `}
`;

export default SmallLabel;