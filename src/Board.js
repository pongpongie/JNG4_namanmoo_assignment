import "./Board.css";
import { useState } from "react";

function Header(props) {
  return (
    <header className="header">
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
      <h1>My Page</h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <div className="navLists" key={t.id}>
        <img src={t.url} alt="mock"></img>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {t.title}
        </a>
      </div>
    );
  }
  return <div className="navContainer">{lis}</div>;
}

function Article(props) {
  console.log(props.url);
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
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  );
}

function Board() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "Duis metus ipsum",
      body: "Phasellus et lacus a enim sodales finibus. Praesent convallis lectus non posuere mattis. Ut condimentum convallis arcu, nec lobortis orci maximus sed. Etiam faucibus lobortis massa eu gravida. Sed congue tristique mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec vestibulum sed lorem eget feugiat. Sed pretium dui leo, a tincidunt eros luctus eu.",
      url: "https://picsum.photos/64/64",
    },
    {
      id: 2,
      title: "Dolor sit amet",
      body: "Maecenas eget sollicitudin urna, ac mattis urna. Phasellus ullamcorper elit dapibus auctor porttitor. Curabitur vel nibh mauris. Donec in lectus ut leo hendrerit mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus eleifend facilisis egestas. Cras molestie fringilla porta. Vivamus lobortis eros pharetra lacus aliquam, vel sagittis est auctor. Ut aliquam purus dolor, non volutpat tortor accumsan nec. Vivamus tincidunt, est a semper fermentum, lectus tellus tempus felis, et aliquam augue augue vitae sem.",
      url: "https://picsum.photos/64/64",
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet sem semper, scelerisque ex in, convallis velit. Maecenas eleifend urna nec vestibulum molestie. Sed porttitor congue euismod. Nam arcu dui, pellentesque in purus sed, ultricies mollis magna. Duis scelerisque purus id mauris pharetra pretium. Phasellus sem ante, gravida eget tortor a, ullamcorper cursus eros. Donec pellentesque venenatis bibendum. Mauris semper mattis magna, sit amet pulvinar magna molestie quis. Pellentesque vitae nibh dolor. Sed dictum, eros eu commodo sodales, elit lectus lacinia nulla, id suscipit ex turpis at dui. Maecenas laoreet dui ut turpis eleifend venenatis. Sed nec ante vel nulla sagittis congue nec sollicitudin dui. Etiam convallis fringilla auctor. Donec aliquam elit ligula, id egestas dolor vulputate eget. Maecenas eget metus et tortor ornare blandit non a massa. Vestibulum rhoncus purus sed hendrerit aliquam.",
      url: "https://picsum.photos/64/64",
    },
  ]);
  let content = null;
  let contextControl = null;
  if (mode === "WELCOME") {
    content = (
      <h1>
        Welcome to the Jungle <br></br> this is Jungle Board
      </h1>
    );
  } else if (mode === "READ") {
    let title,
      body,
      url = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        url = topics[i].url;
      }
    }
    content = <Article url={url} title={title} body={body}></Article>;
    contextControl = (
      <>
        <button
          href={"/update" + id}
          onClick={(event) => {
            event.preventDefault();
            setMode("UPDATE");
          }}
        >
          Update
        </button>
        <input
          type="button"
          value="Delete"
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
      </>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          const newTopics = [...topics];
          const updatedTopic = { id: id, title: title, body: body };
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
  }

  return (
    <div className="board">
      <Header
        title="JUNGLE BOARD"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <div className="boardContainer">
        <div className="boardContent">{content}</div>
        <div className="boardInfo">
          <Nav
            topics={topics}
            onChangeMode={(_id) => {
              setMode("READ");
              setId(_id);
            }}
          ></Nav>
          <div className="contextContainer">
            <button
              href="/create"
              onClick={(event) => {
                event.preventDefault();
                setMode("CREATE");
              }}
            >
              Create
            </button>
            {contextControl}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
