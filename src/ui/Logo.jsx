import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.div`
  text-align: center;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-family: "Dancing Script", cursive;
  font-size: 2rem;
  color: var(--color-green-700);
`;

function Logo() {
  const navigate = useNavigate();

  return (
    <StyledLogo onClick={() => navigate("/")}>
      <img src="/logoo.png" alt="Logo" />
      <LogoText>Mountain Villas</LogoText>
    </StyledLogo>
  );
}

export default Logo;
