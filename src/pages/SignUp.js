import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <SignUpWrapper>
      <input type="text" placeholder="아이디" className="id" />
      <input type="text" placeholder="패스워드" className="password" />
      <input type="text" placeholder="패스워드 확인" className="password" />
      <ChangeModeWrapper>
        <p>로그인으로 돌아가기</p>
        <button
          className="goBackButton"
          onClick={() => {
            navigate("/login");
          }}
        >
          돌아가기
        </button>
      </ChangeModeWrapper>
    </SignUpWrapper>
  );
}

const SignUpWrapper = styled.div`
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
