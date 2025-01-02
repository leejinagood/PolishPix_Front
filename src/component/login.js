import '../css/login.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

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
      const response = await axios.post('http://localhost:8080/login/${email}&${password}', {
        email,
        password
      });
      console.log('서버 응답:', response.data);
      // navigate('/');
    } catch (error) {
      alert('회원가입 실패');
      console.error('에러:', error.response?.data || error.message);
    }
  };

  // 이미지 클릭 핸들러
  const handleSignupClick = () => {
    navigate('/signup', {}); 
  };

  return (
    <div class="root">
        <div class="signin-wrapper form active">
            <div class="form-wrapper">
            <h5 class="login-text">로그인 하세요</h5>
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
            <button class="button primary" onClick={handleLogin}>Sign In</button>
            <button class="button secondary" onClick={() => handleSignupClick()} >Sign Up</button>
            </div>
        </div>
    </div>
  );
}

export default Login;