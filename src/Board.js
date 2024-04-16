import "./Board.css";
import { fetchPosts, createPost, updatePost, deletePost } from "./api";
import { useEffect, useState } from "react";

function Header(props) {
  return (
    <header className="header">
      <h2 className="headerTitle">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode("WELCOME");
          }}
        >
          {props.title}
        </a>
      </h2>
      <h2 className="myPage">My Page</h2>
    </header>
  );
}

function Nav(props) {
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
          mode={props.mode}
          setCommentMode={props.onChangeCommentMode}
          setMode={props.setMode}
          addComment={props.addComment}
        />
      );
    } else {
      return <div className="navContainer">{lis}</div>;
    }
  }
  return <div className="navContainer">{lis}</div>;
}

function Comment(props) {
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

function Article(props) {
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

function Create(props) {
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
            const id = null;
            props.onCreate(id, title, body, url, comment);
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
              onClick={(event) => {
                // props.onChangeCommentMode("SHOWCOMMENT");
                // props.setSelectedTopicId(props.nextId);
              }}
              type="submit"
              value="글 작성하기"
            ></input>
          </p>
        </form>
      </div>
    </article>
  );
}

function Update(props) {
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

function Board() {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [mode, setMode] = useState("WELCOME");
  const [commentMode, setCommentMode] = useState("NOCOMMENT");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(5);
  const [topics, setTopics] = useState([]);

  let content = null;
  let contextControl = null;

  const handleCreate = (id, title, body, url, comments) => {
    const newPost = { id: nextId, title, body, url, comments };
    console.log(newPost);
    createPost(newPost)
      .then((post) => {
        setTopics(topics.concat(post));
        setMode("READ");
        setId(nextId);
        setNextId(nextId + 1);
      })
      .catch((error) => {
        // 에러 처리
      });
  };

  const handleUpdate = (id, title, body, url) => {
    updatePost(id, { title, body, url })
      .then((updatedPost) => {
        const newTopics = topics.map((topic) =>
          topic.id === id ? updatedPost : topic
        );
        setTopics(newTopics);
        setMode("READ");
      })
      .catch((error) => {
        // 에러 처리
      });
  };

  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        const newTopics = topics.filter((topic) => topic.id !== id);
        setTopics(newTopics);
        setMode("WELCOME");
      })
      .catch((error) => {
        // 에러 처리
      });
  };

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setTopics(data);
      })
      .catch((error) => {
        // 에러 처리
      });
  }, []);

  const addCommentToTopic = (topicId, newComment) => {
    setTopics((topics) =>
      topics.map((topic) =>
        topic.id === topicId
          ? { ...topic, comments: [...topic.comments, newComment] }
          : topic
      )
    );
  };
  if (mode === "WELCOME") {
    content = (
      <h1>
        Welcome to the Jungle <br></br> this is Jungle Board
      </h1>
    );
    contextControl = (
      <button
        className="contextButtons"
        href="/create"
        onClick={(event) => {
          event.preventDefault();
          setMode("CREATE");
        }}
      >
        글 작성하기
      </button>
    );
  } else if (mode === "READ") {
    let title,
      body,
      url,
      comments = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        url = topics[i].url;
        comments = topics[i].comments;
      }
    }
    content = (
      <Article
        comments={comments}
        url={url}
        title={title}
        body={body}
      ></Article>
    );

    contextControl = (
      <>
        <button
          className="contextButtons"
          href="/comment"
          onClick={(event) => {
            event.preventDefault();
            setCommentMode("WRITECOMMENT");
          }}
        >
          댓글 달기
        </button>
        <button
          className="contextButtons"
          href={"/update" + id}
          onClick={(event) => {
            event.preventDefault();
            setMode("UPDATE");
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
              if (topics[i].id !== id) {
                newTopics.push(topics[i]);
              }
            }
            setTopics(newTopics);
            setMode("WELCOME");
          }}
        ></input>
        <button
          className="contextButtons"
          onClick={(event) => {
            event.preventDefault();
            setMode("WELCOME");
            setCommentMode("NOCOMMENT");
          }}
        >
          뒤로 가기
        </button>
      </>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        nextId={nextId}
        setSelectedTopicId={setSelectedTopicId}
        selectedTopicId={selectedTopicId}
        commentMode={commentMode}
        onChangeCommentMode={setCommentMode}
        onCreate={handleCreate}
      ></Create>
    );
    contextControl = (
      <button
        className="contextButtons"
        onClick={(event) => {
          event.preventDefault();
          setMode("READ");
        }}
      >
        뒤로 가기
      </button>
    );
  } else if (mode === "UPDATE") {
    let title,
      body,
      url,
      comment = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        url = topics[i].url;
        comment = topics[i].comments;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        url={url}
        comment={comment}
        onUpdate={(title, body, url) => {
          const newTopics = [...topics];
          const updatedTopic = {
            id: id,
            title: title,
            body: body,
            url: url,
            comments: comment,
          };
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              newTopics[i] = updatedTopic;
              break;
            }
          }
          setTopics(newTopics);
          setMode("READ");
        }}
      ></Update>
    );
    contextControl = (
      <button
        className="contextButtons"
        onClick={(event) => {
          event.preventDefault();
          setMode("READ");
        }}
      >
        뒤로 가기
      </button>
    );
  }

  return (
    <div className="board">
      <Header title="JUNGLE BOARD" onChangeMode={setMode}></Header>
      <div className="boardContainer">
        <div className="boardContent">{content}</div>
        <div className="boardInfo">
          <Nav
            topics={topics}
            mode={mode}
            setMode={setMode}
            commentMode={commentMode}
            selectedTopicId={selectedTopicId}
            setSelectedTopicId={setSelectedTopicId}
            onChangeCommentMode={setCommentMode}
            addComment={addCommentToTopic}
            onChangeMode={(_id) => {
              setMode("READ");
              setId(_id);
            }}
          ></Nav>
          <div className="contextContainer">{contextControl}</div>
        </div>
      </div>
    </div>
  );
}

export default Board;
