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
      <InputArea />
      <InputArea />
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

function InputArea() {
  return (
    <div className="inputArea">
      <input type="text" />
    </div>
  );
}

function SubmitArea() {
  return <a href="/submit">Submit</a>;
}

function App() {
  return (
    <div>
      <Board />
    </div>
  );
}

export default App;
