import { useState } from "react";

export default function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const [url, setUrl] = useState(props.url);
  return (
    <article className="updateArticle">
      <h2 className="updateTitle">글 수정하기</h2>
      <div className="updateBody">
        <form
          className="updateForm"
          onSubmit={(event) => {
            event.preventDefault();
            const title = event.target.title.value;
            const body = event.target.body.value;
            const url = event.target.url.value;
            props.onUpdate(title, body, url);
          }}
        >
          <input
            className="formUrl"
            type="url"
            name="url"
            value={url}
            placeholder="Please put your Image Url"
            onChange={(event) => {
              setUrl(event.target.value);
            }}
          />
          <input
            className="formTitle"
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <textarea
            maxLength="1000"
            className="formBody"
            name="body"
            placeholder="body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></textarea>
          <p>
            <input
              className="contextButtons"
              type="submit"
              value="수정 완료"
            ></input>
          </p>
        </form>
      </div>
    </article>
  );
}
