import Comment from "../../features/Comment";

export default function Nav(props) {
  const lis = [];
  const commentList = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <div className="navLists" key={t.id}>
        <div className="navListsImgContainer">
          <img className="navListsImg" src={t.url} alt="mock"></img>
        </div>
        <div className="navListsContentContainer">
          <a
            className="navListsContentTitle"
            id={t.id}
            href={"/read/" + t.id}
            onClick={(event) => {
              event.preventDefault();
              props.onChangeMode(Number(event.target.id));
              props.onChangeCommentMode("SHOWCOMMENT");
              props.setSelectedTopicId(t.id);
            }}
          >
            {t.title}
          </a>
          <div className="navListsContentComment">
            댓글 수 : {t.comments.length}
          </div>
        </div>
      </div>
    );
    if (props.selectedTopicId === t.id) {
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
