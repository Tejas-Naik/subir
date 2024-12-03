import { createGlobalStyle } from 'styled-components';
import themeList from '../data/themeList';

// Typography
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Colors */
    --darkBlue_1: #1B1B3A;
    --darkBlue_2: #242451;
    --darkBlue_3: #2C2C6C;
    --darkBlue_4: #35356E;
    --mediumSlateBlue: #6C62E2;
    --lightBlue_1: #F3F1FE;
    --lightBlue_2: #E9E7F6;
    --lightBlue_3: #E0DDF5;
    --white: #FFFFFF;
    --black: #000000;

    /* Error Colors */
    --error: #FF3B3B;
    --error-bg: #FFE5E5;
    --success: #28A745;
    --success-bg: #E8F5E9;

    /* Typography */
    --family-primary: 'Poppins', sans-serif;
    --family-secondary: 'Montserrat', sans-serif;

    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;

    /* Shadows */
    --shadow-small: 0 1px 3px rgba(0,0,0,0.1);
    --shadow-medium: 0 4px 6px rgba(0,0,0,0.1);
    --shadow-large: 0 10px 20px rgba(0,0,0,0.1);

    /* Sizes */
    --header-height: 60px;
    --container-width: 1200px;
    --footer-height: 50px;
    --sidebar-width: 250px;
  }

  html {
    font-size: 10px;
    scroll-behavior: smooth;
  }

  body {
    background-color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--lightBlue_1)' : 'var(--darkBlue_1)'};
    font-family: var(--family-primary);
    transition: background-color var(--transition-normal);
  }

  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--darkBlue_2)' : 'var(--lightBlue_1)'};
    transition: color var(--transition-fast);

    &:hover {
      color: var(--mediumSlateBlue);
    }
  }

  ul, li {
    list-style: none;
  }

  .container {
    max-width: var(--container-width);
    width: 90%;
    margin: 0 auto;
  }

  img {
    width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    font-family: var(--family-primary);
    outline: none;
    border: none;
    background-color: transparent;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  input, textarea {
    font-family: var(--family-primary);
  }

  .section {
    padding: 10rem 0;
  }

  @media only screen and (max-width: 768px) {
    html {
      font-size: 9px;
    }
    .section {
      padding: 5rem 0;
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(-100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--lightBlue_2)' : 'var(--darkBlue_2)'};
  }

  ::-webkit-scrollbar-thumb {
    background: var(--mediumSlateBlue);
    border-radius: 4px;
    
    &:hover {
      background: ${({ theme: { theme } }) =>
        theme === themeList.light ? 'var(--darkBlue_3)' : 'var(--lightBlue_3)'};
    }
  }

  /* Selection Styles */
  ::selection {
    background: var(--mediumSlateBlue);
    color: var(--white);
  }
`;

export default GlobalStyles;
