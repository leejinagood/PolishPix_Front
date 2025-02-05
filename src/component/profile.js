import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import '../css/profile.css';
import Userprofile from '../image/userprofile.png';
import post from '../image/post.png';
import like from '../image/like.png';
import write from '../image/write.png';

function Profile() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [UserId, setUserId] = useState(null); // 사용자 ID
  const [userData, setUserData] = useState(null); // 사용자 데이터
  const [contentData, setContentData] = useState([]); // 콘텐츠 데이터를 저장할 상태 (기본값을 빈 배열로 설정)

  useEffect(() => {
    const token = cookies.get('LoginToken');
    if (!token) {
      navigate('/login'); // 토큰이 없을 땐 로그인 화면으로 이동
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}/token`, { token })
        .then(response => {
          const { _id } = response.data;
          setUserId(_id); // 응답값으로 받은 id를 상태에 저장
        })
        .catch(error => {
          console.error('인증 오류:', error.response?.data || error.message);
          navigate('/login'); // 인증 실패 시 로그인 페이지로 리디렉션
        });
    }
  }, [navigate, cookies]);

  useEffect(() => {
    if (UserId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/User/${UserId}`)
        .then((response) => {
          setUserData(response.data); // 사용자 데이터 상태에 저장
        })
        .catch((error) => {
          console.error('사용자 데이터 가져오기 오류:', error.response?.data || error.message);
        });
    }
  }, [UserId]);

  useEffect(() => {
    if (UserId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/Content/user/${UserId}`)
        .then((response) => {
          setContentData(response.data); // 콘텐츠 데이터 상태에 저장
        })
        .catch((error) => console.log(error)); // 에러 처리
    }
  }, [UserId]);

  if (!userData) {
    return <div>로딩 중...</div>; // 프로필 데이터가 없으면 로딩 표시
  }

  // 이미지 클릭 핸들러
  const handleImageClick = (postId) => {
    navigate('/board', { state: { postId } }); // state를 통해 데이터 전달
  };

  //프로필 수정 라우트 
  const handleProfileUpdateClick = () => {
    navigate('/profileUpdate'); 
  };

  //글 작성 라우트
  const handleWriteClick = () => {
    navigate('/write'); 
  };
  
  //로그아웃
  const handleLogOutClick = () => {
    cookies.remove('LoginToken', {path : '/'},1000)
    navigate('/')
  }
  
  return (
    <div>
      {userData.profile === null ? (
        <img src={Userprofile} className="MyProfile" alt="User Profile" />
      ) : (
        <img src={userData.profile} className="MyProfile" alt="User Profile" />
      )}
      <div className="MyInfo">
        <p style={{ fontSize: '20px' }}>{userData.name}</p>
        <p style={{ fontSize: '15px' }}>{userData.email}</p>
        <p style={{ fontSize: '15px' }}>{userData.phone}</p>
        <button className="UpdateButton" onClick={() => handleProfileUpdateClick()}>프로필 수정</button>
        &nbsp;&nbsp;
        <button className="UpdateButton" onClick={() => handleLogOutClick()}>로그아웃</button>
      </div>
      <br />
      <hr className="hr" />
      <div className="select">
        <img src={post} className='selectimg'></img>
        <p className="selecttext">게시글 </p>
      </div>
      <div className="select" onClick={() => handleWriteClick()}>
        <img src={write} className='selectimg'></img>
        <p className="selecttext">글쓰기 </p>
      </div>
      <div className="select">
        <img src={like} className='selectimg'></img>
        <p className="selecttext">좋아요 </p>
      </div>

      <hr className="hr" />
      <br />
      <div className="image-grid">
        {contentData.length === 0 ? (
          <p>게시글이 없습니다.</p> // 콘텐츠 데이터가 없을 때 메시지 표시
        ) : (
          contentData.map(
            (post) =>
              post.images.length > 0 && (
                <img
                  key={post.images[0].image_id}
                  src={post.images[0].image_url}
                  className="thumb"
                  alt="Post Thumbnail"
                  onClick={() => handleImageClick(post._id)}
                />
              )
          )
        )}
      </div>
    </div>
  );
}

export default Profile;
