import "../assets/Board.css";
import Article from "../components/Article";
import Update from "../features/Update";
import Header from "../components/layouts/Header";
import Create from "../features/Create";
import Welcome from "./WelcomePage";
import Read from "./ReadPage";
import Nav from "../components/layouts/Nav";
import CreateButton from "../components/CreateButton";
import ContextButtons from "../components/ContextButtons";

import { PostContext, BoardInfoContext } from "../context/Contexts";
import { useLocation, useParams } from "react-router-dom";
import { fetchPosts, createPost, deletePost } from "../lib/api";
import { useEffect, useState, useContext } from "react";

function Board() {
  const [mode, setMode] = useState("WELCOME");
  const [commentMode, setCommentMode] = useState("NOCOMMENT");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState();
  const [topics, setTopics] = useState([]);

  let content = null;
  let contextControl = null;

  const handleCreate = (id, title, body, url, comments) => {
    const newPost = { id: nextId, title, body, url, comments };
    createPost(newPost)
      .then((post) => {
        setTopics(topics.concat(post));
        setMode("READ");
        setId(nextId);
        setNextId(nextId + 1);
      })
      .catch((error) => {});
  };

  const handleDelete = (id) => {
    deletePost(id);
  };

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setNextId(data[data.length - 1].id + 1);
        setTopics(data);
      })
      .catch((error) => {});
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

  if (mode === "UPDATE") {
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
      />
    );
    contextControl = (
      <ContextButtons
        mode={mode}
        onChangeMode={setMode}
        onChangeCommentMode={setCommentMode}
      />
    );
  }
  return (
    <div className="board">
      <Header title="JUNGLE BOARD" onChangeMode={setMode} />
      <div className="boardContainer">
        <PostContext.Provider value={{ topics, nextId, handleCreate }}>
          <BoardContent />
        </PostContext.Provider>
        <BoardInfoContext.Provider
          value={{ topics, setTopics, contextControl, handleDelete }}
        >
          <BoardInfo />
        </BoardInfoContext.Provider>
      </div>
    </div>
  );
}

function BoardContent() {
  const location = useLocation();
  const params = useParams();
  let contents = null;

  if (
    location.pathname === "/board/welcome" ||
    location.pathname === "/board"
  ) {
    contents = <Welcome />;
  } else if (location.pathname === "/board/create") {
    contents = <Create />;
  } else if (location.pathname.startsWith("/board/read/")) {
    contents = <Read id={params.id} />;
  }
  return <div className="boardContent">{contents}</div>;
}

function BoardInfo() {
  let { topics, contextControl } = useContext(BoardInfoContext);
  const location = useLocation();
  const params = useParams();

  if (
    location.pathname === "/board/welcome" ||
    location.pathname === "/board"
  ) {
    contextControl = <CreateButton />;
  } else if (
    location.pathname.startsWith("/board/read/") ||
    location.pathname.startsWith("/board/create")
  ) {
    contextControl = <ContextButtons id={params.id} />;
  }
  return (
    <div className="boardInfo">
      <Nav />
      <div className="contextContainer">{contextControl}</div>
    </div>
  );
}

export default Board;
