import '../css/signup.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KakaoSingUp from '../image/kakao_login_medium_narrow.png';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  // 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 회원가입 요청 핸들러
  const handleSignup = async () => {
    const { name, email, password, password2, phone } = formData;

    // 비밀번호 확인
    if (password !== password2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/Signup', {
        name,
        email,
        password,
        phone,
      });
      alert('회원가입 완료');
      console.log('서버 응답:', response.data);
      navigate('/');
    } catch (error) {
      alert('회원가입 실패');
      console.error('에러:', error.response?.data || error.message);
    }
  };

  return (
    <div className="root">
      <div className="signin-wrapper form active">
        <div className="form-wrapper">
          <h5 className="login-text">회원가입</h5>
          <input type="text" name="name" placeholder="Your Name" className="form-field" 
          value={formData.name} onChange={handleChange}/>

          <input type="email" name="email" placeholder="Email" className="form-field" 
          value={formData.email} onChange={handleChange}/>

          <input type="password" name="password" placeholder="Password" className="form-field"
            value={formData.password} onChange={handleChange} />
          
          <input type="password" name="password2" placeholder="Re-enter Password" className="form-field"
            value={formData.password2} onChange={handleChange} />
          
          <input type="text" name="phone" placeholder="Mobile number" className="form-field"
            value={formData.phone} onChange={handleChange} />

          <button className="button primary" onClick={handleSignup}>
            Sign Up
          </button>
          <img className="kakaoSingup" src={KakaoSingUp} alt="Kakao Signup" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
