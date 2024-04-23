import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { BoardInfoContext } from "../../context/Contexts";
import Comment from "../../features/Comment";

export default function Nav(props) {
  const { topics } = useContext(BoardInfoContext);
  const lis = [];
  const commentList = [];
  const navigate = useNavigate();

  for (let i = 0; i < topics.length; i++) {
    let t = topics[i];
    lis.push(
      <div className="navLists" key={t.id}>
        <div className="navListsImgContainer">
          <img className="navListsImg" src={t.url} alt="mock"></img>
        </div>
        <div className="navListsContentContainer">
          <div
            className="navListsContentTitle"
            id={t.id}
            onClick={(event) => {
              event.preventDefault();
              navigate("read/" + t.id);
            }}
          >
            {t.title}
          </div>
          <div className="navListsContentComment">
            댓글 수 : {t.comments.length}
          </div>
        </div>
      </div>
    );
    if (t.comments.length === 0) {
      let contents = (
        <h1 className="noCommentContainer" key={"noComments"}>
          댓글이 없습니다! <br></br> 댓글을 작성해 주세요.
        </h1>
      );
      commentList.push(contents);
    }
    for (let j = 0; j < t.comments.length; j++) {
      let c = t.comments[j];
      let contents = (
        <div className="navLists" key={Number(c.commentNumber)}>
          <div className="navListsUserIdContainer">
            <div className="navListsUserId">{c.userId}</div>
          </div>
          <div className="navListsCommentContainer">
            <p
              className="navListsCommentBody"
              id={c.userId}
              href={"/read/" + c.userId}
            >
              {c.body}
            </p>
          </div>
        </div>
      );
      commentList.push(contents);
    }
  }

  if (props.mode === "READ") {
    if (props.commentMode === "SHOWCOMMENT") {
      return <div className="navContainer">{commentList}</div>;
    } else if (props.commentMode === "WRITECOMMENT") {
      return (
        <Comment
          commentNumber={Number(
            props.topics[props.selectedTopicId - 1].comments.length
          )}
          selectedTopicId={props.selectedTopicId}
          setSelectedTopicId={props.setSelectedTopicId}
          commentMode={props.commentMode}
          setCommentMode={props.onChangeCommentMode}
          addComment={props.addComment}
        />
      );
    } else {
      return <div className="navContainer">{lis}</div>;
    }
  }
  return <div className="navContainer">{lis}</div>;
}
