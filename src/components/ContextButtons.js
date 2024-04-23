import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { BoardInfoContext } from "../context/Contexts";

export default function ContextButtons({ id }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { topics, setTopics, handleDelete } = useContext(BoardInfoContext);

  console.log(topics);
  console.log(typeof id);

  if (location.pathname.startsWith("/board/read/")) {
    return (
      <>
        <button
          className="contextButtons"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          댓글 달기
        </button>
        <button
          className="contextButtons"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          글 수정하기
        </button>
        <input
          className="contextButtons"
          type="button"
          value="글 삭제하기"
          onClick={() => {
            const newTopics = [];
            for (let i = 0; i < topics.length; i++) {
              console.log("typeof ", typeof topics[i].id);
              if (topics[i].id !== Number(id)) {
                newTopics.push(topics[i]);
              }
            }
            setTopics(newTopics);
            handleDelete(id);
            navigate("/board/welcome");
          }}
        ></input>
        <button
          className="contextButtons"
          onClick={(event) => {
            event.preventDefault();
            navigate(-1);
          }}
        >
          뒤로 가기
        </button>
      </>
    );
  } else if (location.pathname === "/board/create") {
    return (
      <button
        className="contextButtons"
        onClick={(event) => {
          event.preventDefault();
          navigate(-1);
        }}
      >
        뒤로 가기
      </button>
    );
  }
}
