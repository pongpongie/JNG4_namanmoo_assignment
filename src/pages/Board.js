import "../assets/Board.css";
import Article from "../components/Article";
import Update from "../features/Update";
import Header from "../components/layouts/Header";
import Create from "../features/Create";
import Nav from "../components/layouts/Nav";
import { fetchPosts, createPost, updatePost, deletePost } from "../lib/api";
import { useEffect, useState } from "react";

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
