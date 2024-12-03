import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import themeList from '../data/themeList';
import Logo from './Logo';
import ThemeSwitcher from './ThemeSwitcher';

const HeaderStyles = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  z-index: 1000;
  background: ${({ theme: { theme } }) =>
    theme === themeList.light
      ? 'linear-gradient(to right, var(--lightBlue_1), var(--lightBlue_2))'
      : 'linear-gradient(to right, var(--darkBlue_3), var(--darkBlue_2))'};
  border-bottom: 1px solid var(--mediumSlateBlue);
  box-shadow: ${props => props.hasScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;

  &.header-hidden {
    transform: translateY(-100%);
  }

  .container {
    width: 100%;
  }

  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 2rem;

    @media only screen and (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  nav {
    display: flex;
    align-items: center;
    height: 100%;
    
    ul {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      margin-right: 2rem;
      height: 100%;

      @media only screen and (max-width: 768px) {
        position: fixed;
        top: var(--header-height);
        left: 0;
        width: 100%;
        height: calc(100vh - var(--header-height));
        background: ${({ theme: { theme } }) =>
          theme === themeList.light
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(25, 29, 43, 0.95)'};
        flex-direction: column;
        justify-content: flex-start;
        padding: 2rem;
        margin: 0;
        gap: 2rem;
        transform: translateX(${props => (props.isOpen ? '0' : '-100%')});
        transition: transform 0.3s ease-in-out;
        backdrop-filter: blur(10px);
        z-index: 100;
      }
    }

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      position: relative;

      @media only screen and (max-width: 768px) {
        width: 100%;
        height: auto;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        font-weight: 500;
        padding: 0.5rem 1.5rem;
        height: 100%;
        color: ${({ theme: { theme } }) =>
          theme === themeList.light ? 'var(--darkBlue_2)' : 'var(--lightBlue_1)'};
        transition: all 0.3s ease;
        border-radius: 8px;
        position: relative;
        text-decoration: none;

        @media only screen and (max-width: 768px) {
          width: 100%;
          padding: 1rem;
          font-size: 1.8rem;
        }

        &:hover {
          color: var(--mediumSlateBlue);
          background: ${({ theme: { theme } }) =>
            theme === themeList.light
              ? 'rgba(73, 95, 239, 0.1)'
              : 'rgba(73, 95, 239, 0.2)'};
          transform: translateY(-2px);

          @media only screen and (max-width: 768px) {
            transform: translateX(10px);
          }
        }

        &.active {
          color: var(--mediumSlateBlue);
          background: ${({ theme: { theme } }) =>
            theme === themeList.light
              ? 'rgba(73, 95, 239, 0.15)'
              : 'rgba(73, 95, 239, 0.25)'};
        }
      }
    }
  }

  .navMenu {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 1.5rem;

    @media only screen and (max-width: 768px) {
      gap: 1rem;
    }
  }

  .menuIcon {
    display: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    background: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--lightBlue_2)' : 'var(--darkBlue_2)'};
    color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--darkBlue_2)' : 'var(--lightBlue_1)'};
    transition: all 0.3s ease;
    z-index: 200;
    
    &:hover {
      background: var(--mediumSlateBlue);
      color: var(--white);
    }

    @media only screen and (max-width: 768px) {
      display: flex;
    }
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: var(--header-height);
  left: 0;
  width: 100%;
  background: ${({ theme: { theme } }) =>
    theme === themeList.light
      ? 'rgba(255, 255, 255, 0.95)'
      : 'rgba(25, 29, 43, 0.95)'};
  backdrop-filter: blur(10px);
  padding: 1rem;
  z-index: 99;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
    
    &:last-child {
      border-bottom: none;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    font-size: 1.2rem;
    display: block;
    padding: 0.5rem;
  }
`;

function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  React.useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { 
      to: 'home',
      label: 'Home',
      type: 'scroll'
    },
    { 
      to: 'services',
      label: 'Services',
      type: 'scroll'
    },
    { 
      to: 'about',
      label: 'About',
      type: 'scroll'
    },
    { 
      to: '/portfolio',
      label: 'Portfolio',
      type: 'route'
    },
    { 
      to: '/pricing',
      label: 'Pricing',
      type: 'route'
    },
    { 
      to: 'contact',
      label: 'Contact',
      type: 'scroll'
    }
  ];

  const handleNavClick = (to, type) => {
    if (isMobile) {
      setIsOpen(false);
    }
    
    if (type === 'scroll' && location.pathname !== '/') {
      // If we're not on the homepage and trying to scroll, redirect to home first
      window.location.href = '/';
    }
  };

  return (
    <HeaderStyles 
      isOpen={isOpen}
      hasScrolled={hasScrolled}
      className={!isHeaderVisible ? 'header-hidden' : ''}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="navigation">
          <div className="logo">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </div>
          <nav>
            <ul>
              {navItems.map(({ to, label, type }) => (
                <li key={to}>
                  {type === 'scroll' ? (
                    <ScrollLink
                      to={to}
                      smooth={true}
                      spy={true}
                      offset={-100}
                      duration={500}
                      activeClass="active"
                      onClick={() => handleNavClick(to, type)}
                    >
                      {label}
                    </ScrollLink>
                  ) : (
                    <RouterLink
                      to={to}
                      className={location.pathname === to ? 'active' : ''}
                      onClick={() => handleNavClick(to, type)}
                    >
                      {label}
                    </RouterLink>
                  )}
                </li>
              ))}
            </ul>
            <div className="navMenu">
              <ThemeSwitcher />
              {isMobile && (
                <motion.div
                  className="menuIcon"
                  onClick={toggleMenu}
                  whileTap={{ scale: 0.9 }}
                >
                  {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </motion.div>
              )}
            </div>
          </nav>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {navItems.map(({ to, label, type }) => (
                <li key={to}>
                  {type === 'scroll' ? (
                    <ScrollLink
                      to={to}
                      smooth={true}
                      spy={true}
                      offset={-100}
                      duration={500}
                      activeClass="active"
                      onClick={() => handleNavClick(to, type)}
                    >
                      {label}
                    </ScrollLink>
                  ) : (
                    <RouterLink
                      to={to}
                      className={location.pathname === to ? 'active' : ''}
                      onClick={() => handleNavClick(to, type)}
                    >
                      {label}
                    </RouterLink>
                  )}
                </li>
              ))}
            </ul>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderStyles>
  );
}

export default Header;
