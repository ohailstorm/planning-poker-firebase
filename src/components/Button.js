import React from 'react';
import styled from 'styled-components';
import { primaryColor, secondaryColor } from './styled';

const StyledButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${props => (props.loading ? secondaryColor : primaryColor)};
  color: ${props => (props.loading ? secondaryColor : primaryColor)};
  margin: 0 1em;
  padding: 0.25em 1em;
  text-decoration: ${props => (props.selected ? 'underline' : 'none')};
  font-size: 24px;
`;

const Button = ({ children, onClick, selected, loading }) => (
  <StyledButton primary onClick={onClick} selected={selected} loading={loading}>
    {children}
  </StyledButton>
);

export default Button;
