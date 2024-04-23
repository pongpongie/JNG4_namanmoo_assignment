import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  return (
    <div className="login">
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
      <div className="changeMode">
        <p>계정이 없으신가요?</p>
        <button
          className="signUpButton"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
