import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import themeList from '../../data/themeList';

const FieldStyles = styled(motion.div)`
  margin-bottom: 1rem;
  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 1.6rem;
    text-transform: capitalize;
    color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--darkBlue_2)' : 'var(--lightBlue_2)'};
  }
  input,
  textarea {
    width: 100%;
    height: ${props => props.as === 'textarea' ? 'auto' : '50px'};
    padding: 1rem;
    border: 2px solid ${({ theme: { theme }, error }) =>
      error ? 'var(--error)' : 
      theme === themeList.light ? 'var(--lightBlue_2)' : 'var(--darkBlue_2)'};
    border-radius: 8px;
    font-size: 1.6rem;
    outline: none;
    color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--darkBlue_1)' : 'var(--lightBlue_1)'};
    background-color: ${({ theme: { theme } }) =>
      theme === themeList.light ? 'var(--lightBlue_2)' : 'var(--darkBlue_2)'};
    transition: all 0.3s ease;

    &:focus {
      border-color: var(--mediumSlateBlue);
    }
    &::placeholder {
      color: ${({ theme: { theme } }) =>
        theme === themeList.light ? 'var(--darkBlue_3)' : 'var(--lightBlue_3)'};
    }
  }
  textarea {
    min-height: 150px;
    resize: vertical;
  }
  .field__error {
    color: var(--error);
    font-size: 1.4rem;
    margin-top: 0.5rem;
    animation: shake 0.3s ease-in-out;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  @media only screen and (max-width: 768px) {
    input,
    textarea {
      font-size: 1.4rem;
      padding: 0.8rem;
    }
  }
`;

function FormField({
  label,
  id,
  rows = 1,
  className,
  error,
  ...rest
}) {
  return (
    <FieldStyles 
      className={className}
      error={error}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label htmlFor={id}>
        {label}
        {rows <= 1 ? (
          <motion.input
            id={id}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...rest}
          />
        ) : (
          <motion.textarea
            id={id}
            rows={rows}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...rest}
          />
        )}
        {error && <div className="field__error">{error}</div>}
      </label>
    </FieldStyles>
  );
}

export default FormField;
