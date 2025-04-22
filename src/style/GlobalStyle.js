import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
height: 100vh;
    background-color: #f8f9fa;
    font-family: 'ChosunGu', 'Montserrat';
  }

  @font-face {
    font-family: 'ChosunGu';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunGu.woff')
      format('woff');
    font-weight: normal;
    font-style: normal; 
  }
  

`;

export default GlobalStyle;
