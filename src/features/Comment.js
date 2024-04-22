export default function Comment(props) {
  let commentNumber = props.commentNumber;
  if (props.commentNumber !== 0) {
    commentNumber += 1;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = event.target.userId.value;
    const body = event.target.body.value;
    props.setSelectedTopicId(props.selectedTopicId);
    props.addComment(props.selectedTopicId, { commentNumber, userId, body });
    props.setCommentMode("SHOWCOMMENT");
  };
  return (
    <article className="commentArticle">
      <div className="commentFormContainer">
        <form className="commentForm" onSubmit={handleSubmit}>
          <input
            className="commentFormUserId"
            name="userId"
            type="text"
            placeholder="닉네임"
          />
          <textarea
            className="commentFormBody"
            name="body"
            type="text"
            maxLength="1000"
            placeholder="댓글을 입력해주세요"
          />
          <input className="submitButton" type="submit" value="댓글 작성" />
        </form>
      </div>
    </article>
  );
}
