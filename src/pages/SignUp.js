import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="signUp">
      <input type="text" placeholder="아이디" className="id" />
      <input type="text" placeholder="패스워드" className="password" />
      <input type="text" placeholder="패스워드 확인" className="password" />
      <div className="changeMode">
        <p>로그인으로 돌아가기</p>
        <button
          className="goBackButton"
          onClick={() => {
            navigate("/login");
          }}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
