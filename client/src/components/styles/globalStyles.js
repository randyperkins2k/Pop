import { createGlobalStyle, css } from 'styled-components';
export default createGlobalStyle`

  * {
    margin: 0;
    text-align: center;
  }
  body {
    font-family: 'Ubuntu';
    background-color: ${props => props.theme.mode === 'dark' ? '#3B4252' : '#fff'};
    color: ${props => props.theme.mode === 'dark' ? '#fff' : '#000'};
  }
  nav {
    position: absolute;
    padding: '2rem 0';
    text-align: center;
    margin-top: -200px;
    margin-left: 120px;
  }
  ul {
    margin-left: -40px;
    margin-top: 0px;
    background-color:#ffd1dc;
  }
  h1{
    margin-top: 30px;
    font-family: 'Londrina Solid', cursive;
    color: #ffd1dc;
    text-align: center;
    margin-bottom: 2.6rem;
  }
  h2 {

  }
  hr {
    border: 1px solid lightgray;
    border-radius: 1px;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
  }
  input {
    box-sizing:border-box;
    margin:20px;
    background-color: #fafafa;
    width:80%;
    resize: vertical;
    padding:16px;
    border-radius:15px;
    border:0;
    box-shadow:4px 4px 10px;
  }

  button {
    color: black;
    font-family: 'Ubuntu';
    padding: 6px 16px;
    background-color: white;
    font-size: 14px;
    border-radius: 6px;
    border-width: 1px;
    border-color: lightgray;
    transition: ease 0.01s all;
    text-transform: uppercase;
    box-shadow: 0px 2px 2px lightgray;
    margin: 1px;
    transition: ease background-color 250ms;
    :active {
        opacity: .5;
        color: black;
        background-color: #ffd1dc;
        padding: 6.25px 16.25px
    }
  }
  

  
`;
