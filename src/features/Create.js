import { useContext } from "react";
import { PostContext } from "../context/Contexts";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const { nextId, handleCreate } = useContext(PostContext);
  return (
    <article className="createArticle">
      <h1 className="createTitle">글 작성하기</h1>
      <div className="createBody">
        <form
          className="createForm"
          onSubmit={(event) => {
            event.preventDefault();
            const title = event.target.title.value;
            const body = event.target.body.value;
            const url = event.target.url.value;
            const comment = [];
            handleCreate(nextId, title, body, url, comment);
            navigate("/board/welcome");
          }}
        >
          <input
            className="formUrl"
            type="url"
            name="url"
            placeholder="이미지 URL을 적어주세요"
          ></input>
          <input
            className="formTitle"
            type="text"
            name="title"
            placeholder="제목"
          />

          <textarea
            className="formBody"
            name="body"
            placeholder="내용을 적어주세요"
            maxLength="1000"
          ></textarea>
          <p>
            <input
              className="contextButtons"
              onClick={(event) => {}}
              type="submit"
              value="글 작성하기"
            ></input>
          </p>
        </form>
      </div>
    </article>
  );
}
