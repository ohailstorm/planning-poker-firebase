import styled from 'styled-components';

export const primaryColor = '#d7464b';
export const secondaryColor = '#028193';

export const Input = styled.input.attrs(props => ({
  // we can define static props
  type: props.type,

  // or we can define dynamic ones
  size: props.size || '1em'
}))`
  color: ${primaryColor};
  font-size: 1em;
  border: 2px solid ${primaryColor};
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

export const Header1 = styled.h1`
  font-size: 1.5em;
  color: ${primaryColor};
`;

export const Header2 = styled.h2`
  font-size: 1em;
  color: ${primaryColor};
`;

export const NavBar = styled.nav`
  display: flex;
  justify-content: center;
`;
