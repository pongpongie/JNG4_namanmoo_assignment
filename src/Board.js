import "./Board.css";
import { useState } from "react";

function Header() {
  return (
    <div className="header">
      <h1>Jungle Board</h1>
      <h1> 내 정보</h1>
    </div>
  );
}

function Body(props) {
  return (
    <div className="body">
      <BoardContainer mode={props.mode} onChange={props.onChange} />
    </div>
  );
}

function Nav(props) {
  return (
    <div className="nav">
      <Button mode={props.mode} onChange={props.onChange} />
    </div>
  );
}

function BoardContainer(props) {
  if (props.mode === "READ") {
    return (
      <div className="boardContainer">
        <Nav mode={props.mode} onChange={props.onChange} />
        <div className="boardContents">
          <Read mode={props.mode} onChange={props.onChange} />
        </div>
      </div>
    );
  } else if (props.mode === "CREATE") {
    return (
      <div className="boardContatiner">
        <Nav mode={props.mode} onChange={props.onChange} />
        <div className="boardContents">
          <Read mode={props.mode} onChange={props.onChange} />
        </div>
      </div>
    );
  }
}

function Read(props) {
  return (
    <>
      <Article />
      <Article />
      <Article />
    </>
  );
}

function Button(props) {
  return (
    <button
      className="button"
      onClick={(event) => {
        props.onChange("CREATE");
      }}
    >
      {props.mode}
    </button>
  );
}

function Create(props) {
  return (
    <form>
      <input placeholder="제목"></input>
      <textarea placeholder="내용을 입력해 주세요"></textarea>
    </form>
  );
}

function Article() {
  return (
    <article className="article">
      <img src="https://via.placeholder.com/150" alt="placeholder" />
      <li>제목</li>
      <li>댓글</li>
    </article>
  );
}

function Board() {
  const [mode, setMode] = useState("READ");
  return (
    <div className="board">
      <Header />
      <Body mode={mode} onChange={setMode} />
    </div>
  );
}

export default Board;
