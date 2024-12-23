import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.div`
  text-align: center;
  cursor: pointer; // Add cursor pointer to indicate it's clickable
`;

function Logo() {
  const navigate = useNavigate();

  return (
    <StyledLogo onClick={() => navigate("/")}>
      <img src="/main-logo1.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
