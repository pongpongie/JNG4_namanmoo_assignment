import "./Board.css";
import { useState } from "react";

function Header(props) {
  return (
    <header className="header">
      <h1 className="headerTitle">
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
      <h1 className="myPage">My Page</h1>
    </header>
  );
}

function Nav(props) {
  const [readComment, setReadComment] = useState("READ");
  const [selectedTopicId, setSelectedTopicId] = useState(null);
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
              setReadComment("COMMENT");
              setSelectedTopicId(t.id);
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
    if (selectedTopicId === t.id) {
      for (let j = 0; j < t.comments.length; j++) {
        let c = t.comments[j];
        let contents = (
          <div className="navLists" key={c.userId}>
            <div className="navListsImgContainer"></div>
            <div className="navListsContentContainer">
              <p
                className="navListsContentTitle"
                id={c.userId}
                href={"/read/" + c.userId}
              >
                {c.body}
              </p>
              <div className="navListsContentComment"></div>
            </div>
          </div>
        );
        commentList.push(contents);
      }
    }
    console.log(commentList);
  }
  if (readComment === "COMMENT") {
    return <div className="navContainer">{commentList}</div>;
  } else {
    return <div className="navContainer">{lis}</div>;
  }
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
      <h1 className="createTitle">Create</h1>
      <div className="createBody">
        <form
          className="createForm"
          onSubmit={(event) => {
            event.preventDefault();
            const title = event.target.title.value;
            const body = event.target.body.value;
            const url = event.target.url.value;
            props.onCreate(title, body, url);
          }}
        >
          <input
            className="formUrl"
            type="url"
            name="url"
            placeholder="Please put your Image Url"
          ></input>
          <input
            className="formTitle"
            type="text"
            name="title"
            placeholder="title"
          />

          <textarea
            className="formBody"
            name="body"
            placeholder="body"
          ></textarea>

          <p>
            <input type="submit" value="Create"></input>
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
  console.log(url);
  return (
    <article className="updateArticle">
      <h2 className="updateTitle">Update</h2>
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
            className="formBody"
            name="body"
            placeholder="body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></textarea>
          <p>
            <input type="submit" value="Update"></input>
          </p>
        </form>
      </div>
    </article>
  );
}

function Comment(props) {
  return (
    <div className="comment">
      <input type="text" placeholder="댓글을 입력해주세요"></input>
      <button>댓글 등록</button>
    </div>
  );
}

function Board() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "이재원은 아주 유명한 곰이다.",
      body: "포유류의 식육목 곰과에 속하는 동물들의 총칭. 아프리카, 오스트레일리아 대륙, 남극을 제외한 전 세계에 분포한다. 현재 총 8종이 생존하고 있으며, 한반도에 사는 곰은 우수리불곰과 아시아흑곰 2종류가 있다. 새끼 곰은 특히 '능소니'라고 한다. 예전에는 '슭곰'이라고 하여 큰 곰을 따로 부르는 말이 있었다. 쿵쿵따 할 때 심심찮게 나오는 '슭곰발'이란 단어는 이 '슭곰'과 '발'이 합쳐진 것이다. 본디 고대 유럽에서는 곰이 동물의 제왕으로 숭배받았다.[5] 게르만이나 슬라브계통의 여타 고대 유럽인들에게 곰은 경외의 대상이었으며, 고대 북유럽과 게르만계통의 문화권에서 '곰 가죽을 뒤집어 쓴 전사'를 가장 뛰어나고 용맹한 사람으로 대우하며 이를 베르세르크/버서커라고 불렀다. 중세를 거치면서 그리스도교의 영향으로 사자에 의해 동물의 왕 이미지를 공고히 하여 곰은 밀려나게 된다. 예외적으로 러시아의 경우, 독수리와 함께 곰을 여전히 국가의 상징으로 같이 내세운다. 식육목 중에서도 개아목에 속하며 같은 개아목인 갯과나 족제비과보다는 바다표범이나 바다사자같은 기각류들과 더 가깝다고 알려져있었지만 유전자 검사로 족제비과와 기각류와도 멀리 있음이 밝혀졌다.[6] 대형 포식자임에도 다양한 식성과 종류, 뛰어난 적응력 덕분에 다른 대형 포식자인 사자나 호랑이 등과 달리 개체 수도 많고 분포도도 넓다. 특히 불곰이 더욱 그렇다.",
      url: "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/602/d037ae2daa4d1aaa20f93fc32edfd756_res.jpeg",
      comments: [
        { userId: 1, body: "comment1" },
        { userId: 2, body: "comment2" },
        { userId: 3, body: "comment3" },
        { userId: 4, body: "comment4" },
      ],
    },
    {
      id: 2,
      title: "이재원은 아주 유명한 꼬부기이다.",
      body: "꼬부기라는 명칭의 유래는 일판은 ゼニガメ(제니가메:청거북), 한판은 꼬마+거북이, 영판은 Squirt(작은 구멍으로 액체를 쏘다)+Turtle(거북)로 추정된다.1세대인 레드/그린/블루와 3세대인 파이어레드/리프그린의 주인공인 레드가 스타팅으로 파이리를 고르면 라이벌이자 이후 챔피언이 되는 그린이 이 녀석을 고른다.반디나 역시도 플레이어가 이상해씨를 골랐을 경우 꼬부기를 사용한다.",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqt-juoU5Sy7dXvujofXFQhs_G7FJLucyyCw&s",
      comments: [
        { userId: 1, body: "comment1" },
        { userId: 2, body: "comment2" },
        { userId: 3, body: "comment3" },
      ],
    },
    {
      id: 3,
      title: "나는 고양이 많아",
      body: "요약하자면 현생 고양이를 포함한 모든 고양이과 동물들이 공통 조상으로부터 약 2000만 년 전에 분화한 이후, 들고양이는 10만~7만여 년 전부터 출현했으며, 가축화는 약 5만여 년 전 이집트나 메소포타미아 등 중동 지역의 아프리카들고양이(Felis lybica)가 식량 확보 등의 이유로 도시 등 인간의 대규모 정착지에 나와 살던 것을 인간이 키우기 시작한 것이 오늘날 고양이의 유래다. 인간과 고양이의 공존은 인간에게는 쥐를 잡아주고 고양이에게는 안정적인 식량 확보가 가능하다는 상호간의 이점이 있었으며, 이로 인해 고양이는 오랜 시간이 지나며 자연스럽게 자기가축화되었다. 이후 고양이는 아프로유라시아 전역에 퍼졌으며, 신항로 개척 시대 이후 아메리카와 오세아니아 대륙에도 퍼지게 되었다. 현존하는 모든 집고양이들은 대략 2000만년 전에 하나의 조상으로부터 갈라져 나온 것으로 추측되며, 그 중 고양이의 조상으로 여겨지는 것은 아프리카들고양이(Felis lybica)라는 동물이다. 중동에 살던 인류가 약 만년 전에 사막 고양이(리비아살쾡이)를 가축화하여 인간과 함께 살기 시작한 것으로 생각된다. 현대의 사막고양이는 살쾡이 종류치고는 체구가 작은 편이지만 꼬리를 제외한 몸길이가 대략 45~75cm 정도, 체중은 약 3~6.5kg 정도인데 만약에 오늘날 집고양이의 조상인 사막고양이도 덩치가 이랬다면 고양이는 인간에게 길들여지는 과정에서 크기가 상당히 작아진 셈이다. 하지만, 아직 중형견에 육박하거나 덩치가 커진 품종도 존재한다. 메인쿤이나 랙돌 등. 고대 이집트인들은 고양이를 신격화(바스테트)할 정도로 좋아했는데, 이는 고양이가 독사를 사냥할 수 있었기 때문이다. 다만, 오늘날 우리가 집에서 기르는 고양이를 가족처럼 생각하며 이름도 지어주는 것과 다르게, 고대 이집트인들은 야생 고양이와 자기 집에 사는 고양이를 구분하지 않았으며, 이름도 지어주는 법이 없이 그냥 “미유”나 “미윳”이라고만 불렀다(“야옹”이라는 뜻). 반면 집에 기르는 개는 이름을 붙여주었다고 하니, 당시 고양이는 아직 완전한 가축/애완동물이 아니라 반 야생/반 공생 동물 취급을 받았던것으로 보인다. 원래 사막 건조기후에서 살던 종류인만큼 지금도 물을 싫어하고 뜨거운 곳을 좋아하는 등 관련 습성이 남아있다. 물도 적게 마셔 요로결석에 자주 걸린다. 간혹 물을 좋아하는 소위 물냥이, 수속성인 소수의 고양이도 있으나, 대부분의 고양이들은 물을 싫어하고 물에 닿는 것 만으로도 스트레스를 심하게 받을 수 있어 고양이에게 물을 접하게 하는 것은 필수적일 때를 제외하곤 주의를 해야한다. 특히 아래 영상처럼 바닷물에서 노는 고양이는 소수의 물을 좋아하는 고양이 중에서도 극소수이며 건강에 큰 영향을 끼칠 수 있기 때문에 절대 시도해선 안된다.",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXzWgwMV7-weSaq4v-hbWUsgU5U-ur8vAHag&s",
      comments: [
        { userId: 1, body: "comment1" },
        { userId: 2, body: "comment2" },
      ],
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
        onCreate={(_title, _body, _url) => {
          const newTopic = {
            id: nextId,
            title: _title,
            body: _body,
            url: _url,
            comments: [],
          };
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
      body,
      url = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
        url = topics[i].url;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        url={url}
        onUpdate={(title, body, url) => {
          const newTopics = [...topics];
          const updatedTopic = {
            id: id,
            title: title,
            body: body,
            url: url,
            comments: [],
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
