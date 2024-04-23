import { useContext } from "react";

import Article from "../components/Article";
import { PostContext } from "../context/Contexts";

export default function Read({ id }) {
  console.log(id);
  const readContexts = useContext(PostContext);
  const topic = readContexts.topics.find((topic) => topic.id === Number(id));
  const { title, body, url, comments } = topic;
  console.log("logloglog", topic);

  return (
    <>
      <Article
        title={title}
        body={body}
        url={url}
        comments={comments}
      ></Article>
    </>
  );
}
