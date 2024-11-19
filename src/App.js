import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import ThemeContext from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import Portfolio from './pages/Portfolio';
import Pricing from './pages/Pricing';
import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <ThemeProvider theme={{ theme }}>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
