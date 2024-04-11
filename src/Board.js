import "./Board.css";

function Board() {
  return (
    <div className="board">
      <form>
        <input placeholder="제목"></input>
        <textarea placeholder="내용을 입력해 주세요"></textarea>
      </form>
    </div>
  );
}

export default Board;
