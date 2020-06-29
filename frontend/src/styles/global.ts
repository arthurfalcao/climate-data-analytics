import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #96c6ff;
    --dark-color: #172b4d;
    --white: #f8f9fe;
  }

  body {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;
