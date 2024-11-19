import React, { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import themeList from '../data/themeList';
import Logo from './Logo';
import ThemeSwitcher from './ThemeSwitcher';

const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background-color: ${({ theme: { theme } }) =>
    theme === themeList.light ? 'var(--lightBlue_1)' : 'var(--darkBlue_3)'};
  border-bottom: 1px solid var(--mediumSlateBlue);
  box-shadow: ${props => props.hasScrolled ? '0px 0px 10px 0px rgba(0, 0, 0, 0.5)' : 'none'};
  transition: box-shadow 0.3s ease-in-out;
  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }
  nav ul li {
    display: inline-block;
    margin: 0 0.5rem;
    a {
      display: inline-block;
      font-size: 1.6rem;
      font-weight: 500;
      padding: 0.5rem 1rem;
      color: ${({ theme: { theme } }) =>
        theme === themeList.light ? 'var(--darkBlue_2)' : 'var(--lightBlue_1)'};
      text-decoration: none;
    }
    &:hover {
      a {
        text-decoration: underline;
      }
    }
    a.active {
      text-decoration: underline;
    }
  }
  .navMenu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .themeSwitcher {
    z-index: -1;
  }
  .menuIcon,
  .closeIcon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: 10px;
    padding: 3px;
    svg {
      color: ${({ theme: { theme } }) =>
        theme === themeList.light ? 'var(--darkBlue_2)' : 'var(--lightBlue_1)'};
    }
    &:hover {
      background-color: #8080803b;
      border-radius: 4px;
    }
  }
  .closeIcon {
    position: absolute;
    right: 10px;
    top: 10px;
    &:hover {
      background-color: #8080803b;
      svg {
        color: white;
      }
    }
  }
  .navOverlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: var(--darkBlue_3);
    opacity: 0.4;
  }
  @media only screen and (max-width: 768px) {
    nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      width: 90%;
      max-width: 250px;
      top: 0;
      right: 0;
      background: ${({ theme: { theme } }) =>
        theme === themeList.light ? 'var(--lightBlue_2)' : 'var(--darkBlue_4)'};
      height: 100vh;
      z-index: 100;
      transform: translateX(100%);
      transition: 0.3s ease-in-out transform;
      overflow: hidden;
    }
    nav.open {
      box-shadow: -1px 4px 10px 3px rgb(0 0 0 / 16%);
      transform: translateX(0);
    }
    nav ul li {
      display: block;
      text-align: right;
      width: 100%;
      margin: 0.5rem 0;
      a {
        display: block;
        width: 100%;
      }
    }
  }
`;

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia('(max-width: 768px)').matches
  );
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    function disableScroll() {
      if (document && document.body) {
        document.body.style.overflow = 'hidden';
      }
    }
    function enableScroll() {
      if (document && document.body) {
        document.body.style.overflow = '';
      }
    }

    if (isNavOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isNavOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setHasScrolled(window.scrollY > 100);
      }
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  return (
    <HeaderStyles hasScrolled={hasScrolled}>
      <div className="container">
        <div className="navigation">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <div className="navMenu">
            <nav className={isMobile && isNavOpen ? 'open' : undefined}>
              {isMobile && (
                <div
                  className="closeIcon"
                  tabIndex="0"
                  role="button"
                  onKeyDown={() => setIsNavOpen(false)}
                  onClick={() => setIsNavOpen(false)}
                >
                  <FiX />
                </div>
              )}
              <ul>
                {isHomePage ? (
                  <>
                    <li>
                      <ScrollLink to="home" smooth activeClass="active" spy>
                        Home
                      </ScrollLink>
                    </li>
                    <li>
                      <ScrollLink to="services" smooth activeClass="active" spy>
                        Services
                      </ScrollLink>
                    </li>
                    <li>
                      <RouterLink to="/portfolio" className="nav-link">
                        Portfolio
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/pricing" className="nav-link">
                        Pricing
                      </RouterLink>
                    </li>
                    <li>
                      <ScrollLink to="contact" smooth activeClass="active" spy>
                        Contact
                      </ScrollLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <RouterLink to="/" className="nav-link">
                        Home
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/portfolio" className="nav-link">
                        Portfolio
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink to="/pricing" className="nav-link">
                        Pricing
                      </RouterLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            {isNavOpen && (
              <div
                className="navOverlay"
                tabIndex="0"
                aria-label="overlay"
                role="button"
                onKeyDown={() => setIsNavOpen(false)}
                onClick={() => setIsNavOpen(false)}
              />
            )}
            <ThemeSwitcher />
            {isMobile && (
              <div
                className="menuIcon"
                tabIndex="0"
                role="button"
                onKeyDown={() => setIsNavOpen(true)}
                onClick={() => setIsNavOpen(true)}
              >
                <FiMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
}
