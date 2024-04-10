import "./App.css";
import { useState } from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Board(props) {
  console.log(props);
  return (
    <div className="board">
      <BoardLeft />
      <BoardRight mode={props.mode} onChange={props.onChange} />
    </div>
  );
}

function BoardLeft() {
  return (
    <div className="board-left">
      <h1>Jungle Board</h1>
    </div>
  );
}

function BoardRight(props) {
  console.log(props);
  if (props.mode === "LOGIN") {
    return (
      <div className="board-right">
        <Login mode={props.mode} onChange={props.onChange} />
        {/* <Submit mode={props.mode} /> */}
      </div>
    );
  } else if (props.mode === "SIGNUP") {
    return (
      <div className="board-right">
        <SignUp mode={props.mode} onChange={props.onChange} />
        {/* <Submit /> */}
      </div>
    );
  }
}

function Login(props) {
  return (
    <div className="login">
      <input type="text" placeholder="아이디" />
      <input type="text" placeholder="패스워드" />
      <button>로그인</button>
      <div className="changeMode">
        <p>계정이 없으신가요?</p>
        <button
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
      <input type="text" placeholder="아이디" />
      <input type="text" placeholder="패스워드" />
      <input type="text" placeholder="이메일" />
      <div className="changeMode">
        <p>로그인으로 돌아가기</p>
        <button
          onClick={() => {
            props.onChange("LOGIN");
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

function App() {
  const [mode, setMode] = useState("LOGIN");
  return (
    <div className="App">
      <Board mode={mode} onChange={setMode} />
    </div>
  );
}

export default App;
