import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import '../css/board.css';
import Userprofile from '../image/userprofile.png'
import Likes from '../image/NomalHeart.jpg'
import CommentComponent from '../component/comment';

function Board() {
  const location = useLocation();
  const { postId } = location.state || {}; // 전달받은 state
  const [data, setData] = useState(null); // 데이터를 저장할 상태
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여주는 이미지 인덱스

  useEffect(() => {
    axios
      .get(`http://localhost:8080/Contetnt/${postId}`) // API 요청
      .then((response) => {
        setData(response.data); // API에서 받은 데이터를 상태에 저장
      })
      .catch((error) => console.log(error)); // 에러 처리
  }, [postId]); // postId가 변경될 때마다 API 요청

  // 데이터가 로드되지 않았을 때 로딩 표시
  if (!data) {
    return <div>Loading...</div>;
  }

  // 이미지 슬라이드: 왼쪽 버튼 클릭
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.images.length - 1 : prevIndex - 1
    );
  };

  // 이미지 슬라이드: 오른쪽 버튼 클릭
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className='Board'>
      {/* 이미지 슬라이드 */}
      <div className="image-slider">
        {/* 이전 버튼: 이미지가 2개 이상일 때만 렌더링 */}
        {data.images.length > 1 && (
          <button className="prev-button" onClick={prevImage}>
            &#60; {/* 왼쪽 화살표 */}
          </button>
        )}

        <img
          src={data.images[currentIndex].image_url}
          alt={`Image ${currentIndex + 1}`}
          className="MainImage"
        />

        {/* 다음 버튼: 이미지가 2개 이상일 때만 렌더링 */}
        {data.images.length > 1 && (
          <button className="next-button" onClick={nextImage}>
            &#62; {/* 오른쪽 화살표 */}
          </button>
        )}
        
        <div className='Content'>
          {data.user.user_profile === "" ? (
            <img src={Userprofile} className="userProfile" />
          ) : (
            <img src={data.user.user_profile} className="userProfile" />
          )}

          <p>{data.user.user_name}</p>
          <p style={{ fontSize: '16px', whiteSpace: "pre-wrap", maxWidth: '300px' }}>{data.post_content}</p>
          <p style={{ fontSize: '16px' }}>{data.insert_date}</p>

          <img className='LikesButton' src={Likes}/>
        </div>
      </div>
      <br />
      <CommentComponent />
    </div>
   
    
  );
}

export default Board;