import React, { useEffect, useState } from "react";

import Article from "../components/Article";
import { fetchPostById } from "../lib/api";

export default function Read({ id }) {
  // 상태를 정의합니다.
  const [post, setPost] = useState({
    title: "",
    body: "",
    url: "",
    comments: [],
  });

  useEffect(() => {
    fetchPostById(id)
      .then((data) => {
        // API로부터 받은 데이터로 상태를 업데이트합니다.
        setPost({
          title: data.title,
          body: data.body,
          url: data.url,
          comments: data.comments,
        });
      })
      .catch((error) => {
        console.error("Failed to fetch post", error);
      });
  }, [id]);

  // 구조 분해 할당을 사용하여 post 상태에서 필요한 값을 추출합니다.
  const { title, body, url, comments } = post;

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
