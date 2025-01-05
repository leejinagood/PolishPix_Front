import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import Userprofile from '../image/userprofile.png';

function ProfileUpdate() {
  
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [UserId, setUserId] = useState(null); // 사용자 ID
    const [userData, setUserData] = useState(null); // 사용자 데이터

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

    console.log('id : '+UserId);

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

    
    console.log(userData.profile);

  return (
    <div>
      {/* {userData.profile === null ? (
              <img src={Userprofile} className="MyProfile" alt="User Profile" />
            ) : (
              <img src={userData.profile} className="MyProfile" alt="User Profile" />
            )}
            <div className="MyInfo">
              <p style={{ fontSize: '20px' }}>{userData.name}</p>
              <p style={{ fontSize: '15px' }}>{userData.email}</p>
              <p style={{ fontSize: '15px' }}>{userData.phone}</p>
            </div>
            <br />
      <hr className="hr"/>
      <br /> */}
    </div>
  );
}

export default ProfileUpdate;
