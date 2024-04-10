import "./App.css";

function Board() {
  return (
    <div className="board">
      <BoardLeft />
      <BoardRight />
    </div>
  );
}

function BoardLeft() {
  return (
    <div className="board-left">
      <BoardContent />
    </div>
  );
}

function BoardRight() {
  return (
    <div className="board-right">
      <Login />
      <SubmitArea />
    </div>
  );
}

function BoardContent() {
  return (
    <div className="boardContent">
      <h1>Jungle Board</h1>
    </div>
  );
}

function Login() {
  return (
    <div className="login">
      <input type="text" placeholder="아이디" />
      <input type="text" placeholder="패스워드" />
    </div>
  );
}

function SubmitArea() {
  return <a href="/submit">제출하기</a>;
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
