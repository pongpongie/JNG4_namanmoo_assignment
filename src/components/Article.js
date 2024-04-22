export default function Article(props) {
  return (
    <article className="readArticle">
      <div className="readArticleImageContainer">
        <img className="readArticleImage" src={props.url} alt="mock"></img>
      </div>
      <div className="readArticleTitleContainer">
        <h2 className="readArticleTitle">{props.title}</h2>
      </div>
      <div className="readArticleBodyContainer">
        <div className="readArticleBody">{props.body}</div>
      </div>
    </article>
  );
}
