import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeContext from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  const { theme } = React.useContext(ThemeContext);
  
  return (
    <ThemeProvider theme={{ theme }}>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
