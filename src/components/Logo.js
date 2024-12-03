import React from 'react';
import styled from 'styled-components';

const LogoStyles = styled.div`
  max-width: 200px;
  display: flex;
  align-items: center;
  height: 100%;
  .logo-text {
    font-style: italic;
    font-weight: bold;
    font-size: 1.5rem;
    color: ${(props) => props.theme.text};
    text-decoration: none;
    transition: color 0.3s ease;
  }
`;

export default function Logo({ ...rest }) {
  return (
    <LogoStyles {...rest}>
      <span className="logo-text">SUBIR STUDIOS</span>
    </LogoStyles>
  );
}
