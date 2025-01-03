import '../css/login.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {Cookies} from 'react-cookie';

function Login() {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const cookies = new Cookies(); // 쿠키값

  // 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 로그인 핸들러
  const handleLogin = async () => {
    const { email, password } = formData;

    try {
      // POST 요청으로 email과 password 전송
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });
      const message = response.data; // 서버에서 반환된 메시지

      if (message === "이메일이 존재하지 않습니다." || message === "비밀번호가 다릅니다.") {
        alert(message); 
      }else{
        // 토큰 저장
        cookies.set('LoginToken', message, { path: '/', maxAge: 3600 }); //유효시간은 1시간 설정 
        alert('로그인 성공!');
        navigate('/');
      }

    } catch (error) {
      console.error('에러:', error.response?.data || error.message);
      alert('로그인 실패. 다시 시도해주세요.');
    }
  };

  // 이미지 클릭 핸들러
  const handleSignupClick = () => {
    navigate('/signup', {}); 
  };

  return (
    <div className="root">
        <div className="signin-wrapper form active">
            <div className="form-wrapper">
            <h5 className="login-text">로그인 하세요</h5>
            <input
            type="text"
            name="email"
            placeholder="Email"
            className="form-field"
            value={formData.name}
            onChange={handleChange}
            />
            <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-field"
            value={formData.password}
            onChange={handleChange}
            />
            <button className="button primary" onClick={handleLogin}>Sign In</button>
            <button className="button secondary" onClick={() => handleSignupClick()} >Sign Up</button>
            </div>
        </div>
    </div>
  );
}

export default Login;