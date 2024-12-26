import '../css/picture.css' ;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Picture() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  // 이미지 클릭 핸들러
  const handleImageClick = (postId) => {
    navigate('/board', { state: { postId} }); // state를 통해 데이터 전달
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/Contetnt/view") // API 요청
      .then((response) => {
        setPosts(response.data.reverse()); // 데이터를 역순으로 저장
      })
      .catch((error) => console.log(error)); // 에러 처리
  }, []);

  return (
    <div className="image-grid">
      {/* imgUrls 배열의 모든 URL을 출력 */}
      {posts.map((post) =>
      post.images.length > 0 && (
        <img
          key={post.images[0].image_id}
          src={post.images[0].image_url}
          className="thumb"
          onClick={() => handleImageClick(post._id)}
        />
      )
    )}
    </div>
  );
}

export default Picture;
