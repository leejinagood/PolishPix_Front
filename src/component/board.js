import React, { useState, useEffect } from "react";
import axios from "axios";

function Board() {
  const [data, setData] = useState(null); // 데이터를 저장할 상태

  useEffect(() => {
    axios
      .get("http://localhost:8080/Content/{id}") // API 요청
      .then((response) => {
        setData(response.data); // API에서 받은 데이터를 상태에 저장
      })
      .catch((error) => console.log(error)); // 에러 처리
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  if (!data) {
    // 데이터가 로드되지 않았을 때 로딩 표시
    return <div>Loading...</div>;
  }

  return (
    <div className="board">
      {/* 게시글 내용 */}
      <h2>게시글 내용</h2>
      <p>{data.post_content}</p>
      <p>작성 날짜: {data.insert_date}</p>
      <p>작성자 ID: {data.user.user_id}</p>

      {/* 이미지 목록 */}
      <div className="image-grid">
        {data.images.map((image) => (
          <img
            key={image.image_id}
            src={image.image_url}
            alt={`Image ${image.image_id}`}
            className="thumb"
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
