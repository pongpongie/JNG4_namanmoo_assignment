import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Login(props) {
  const navigate = useNavigate();
  return (
    <LoginWrapper>
      <input type="text" placeholder="아이디" className="id" />
      <input type="text" placeholder="패스워드" className="password" />
      <button
        className="loginButton"
        onClick={() => {
          navigate("/board");
        }}
      >
        로그인
      </button>
      <ChangeModeWrapper>
        <p>계정이 없으신가요?</p>
        <button
          className="signUpButton"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </button>
      </ChangeModeWrapper>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const ChangeModeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10%;
  font-size: 10px;
`;
