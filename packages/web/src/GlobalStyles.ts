import { createGlobalStyle, css } from 'styled-components';

const GlobalStyles = createGlobalStyle`${css`
  html,
  body {
    background: #f5f5fb 0 0 no-repeat padding-box !important;
    overflow-x: hidden;
  }

  body {
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: rgb(107, 107, 107);
      min-height: 24px;
      border: 3px solid #e8e6f2;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: rgb(157, 157, 157);
    }

    &::-webkit-scrollbar-corner {
      background-color: #e8e6f2;
    }

    &::-webkit-scrollbar {
      background-color: #e8e6f2;
    }
  }
`}
`;

export default GlobalStyles;
