import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie';
import Userprofile from '../image/userprofile.png';
import '../css/user.css';

function User() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // 사용자 데이터를 저장할 상태
  const [contentData, setContentData] = useState(null); // 콘텐츠 데이터를 저장할 상태
  const { userId } = location.state || {}; // 전달받은 state에서 userId 추출
  const cookies = new Cookies(); // Cookies 객체 생성

  useEffect(() => {
    const Token = cookies.get('LoginToken');
    if (Token == null){
      return navigate('/login');
    }
  }, );

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/User/${userId}`) // 첫 번째 API 요청
        .then((response) => {
          setUserData(response.data); // 사용자 데이터 상태에 저장
        })
        .catch((error) => console.log(error)); // 에러 처리
    }
  }, [userId]); // userId가 변경될 때마다 실행

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/Contetnt/user/${userId}`) // 두 번째 API 요청
        .then((response) => {
          setContentData(response.data); // 콘텐츠 데이터 상태에 저장
        })
        .catch((error) => console.log(error)); // 에러 처리
    }
  }, [userId]); // userId가 변경될 때마다 실행


  // useEffect(() => {
  //   const Token = cookies.get('LoginToken');
  //   if (Token == null || !userData || !contentData) {
  //     return navigate('/login');
  //   }
  // }, [userData, contentData, navigate]); // userData나 contentData가 변경될 때마다 실행

  if( !userData || !contentData){
    return <p>Loading..</p>
  }
  

  // 이미지 클릭 핸들러
  const handleImageClick = (postId) => {
    navigate('/board', { state: { postId} }); // state를 통해 데이터 전달
  };
    return(
        <div>
        {userData.profile === "" ? (
            <img src={Userprofile} className="Profile" />
          ) : (
            <img src={userData.profile} className="Profile" />
          )}
        <p style={{ fontSize: '30px' }}>{userData.name}</p>
        <p style={{ fontSize: '20px' }}>{userData.email}</p>
        <p style={{ fontSize: '20px' }}>{userData.phone}</p>
        

        <div className="image-grid">
        {/* imgUrls 배열의 모든 URL을 출력 */}
        {contentData.map((post) =>
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
      </div>
    )
}

export default User;