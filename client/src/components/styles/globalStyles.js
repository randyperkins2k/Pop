import { createGlobalStyle } from 'styled-components';
import { isDarkMode, setIsDarkMode } from '../App.jsx';

export default createGlobalStyle`
  body {
    background-color: 'white';
    margin: 0px;
    font-family: font-family: 'Ubuntu', sans-serif;
    ${props => props.dark && css`
      background-color: darkgrey;
    `}
  }
`;

//const theme = background-color: darkGrey;