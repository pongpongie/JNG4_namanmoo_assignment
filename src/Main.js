import "./Main.css";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Container(props) {
  console.log(props);
  return (
    <div className="main">
      <div className="container">
        <ContainerLeft />
        <ContainerRight mode={props.mode} onChange={props.onChange} />
      </div>
    </div>
  );
}

function ContainerLeft() {
  return (
    <div className="containerLeft">
      <h1>Jungle Board</h1>
    </div>
  );
}

function ContainerRight(props) {
  if (props.mode === "LOGIN") {
    return (
      <div className="containerRight">
        <Login mode={props.mode} onChange={props.onChange} />
      </div>
    );
  } else if (props.mode === "SIGNUP") {
    return (
      <div className="containerRight">
        <SignUp mode={props.mode} onChange={props.onChange} />
      </div>
    );
  }
}

function Login(props) {
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
            props.onChange("SIGNUP");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

function SignUp(props) {
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
            props.onChange("LOGIN");
          }}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
