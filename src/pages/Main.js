import "../assets/Main.css";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";

export default function Main(props) {
  const location = useLocation();
  const renderComponent =
    location.pathname === "/signup" ? <Signup /> : <Login />;
  return (
    <MainWrapper>
      <Container>
        <ContainerLeftWrapper>
          <h1>Jungle Board</h1>
        </ContainerLeftWrapper>
        <ContainerRightWrapper>{renderComponent}</ContainerRightWrapper>
      </Container>
    </MainWrapper>
  );
}

const Container = styled.div`
  height: 50%;
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 10px solid #3dd894;
  border-radius: 80px;
`;

const MainWrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const ContainerLeftWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 60%;
  border-radius: 10px;
  justify-content: center;
`;

const ContainerRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  height: 60%;
  border-radius: 10px;
`;
