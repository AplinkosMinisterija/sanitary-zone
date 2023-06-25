import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AppLogo = () => {
  const navigate = useNavigate();
  return (
    <LogoContainer onClick={() => navigate("/")}>
      <Logo src="/logo.svg" />
    </LogoContainer>
  );
};

export default AppLogo;

const Logo = styled.img`
  width: 122px;
  height: 32px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  cursor: pointer;
`;
