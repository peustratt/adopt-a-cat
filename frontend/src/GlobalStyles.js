import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,
    ::before,
    ::after {
        margin: 0;
        padding: 10px;
        box-sizing: border-box;
    }
`;

const theme = {
  colors: {
    primary: "#0070f3",
    secondary: "#ff0070",
  },
};

export { GlobalStyle, ThemeProvider, theme };
