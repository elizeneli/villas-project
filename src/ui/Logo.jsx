import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

function Logo() {
  return (
    <StyledLogo>
      <img src="/main-logo1.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
