import '../css/signup.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KakaoSingUp from '../image/kakao_login_medium_narrow.png';
import { useNavigate } from 'react-router-dom';

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

  // 에러 상태 관리
  const [errors, setErrors] = useState({});

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 유효성 검사
  const validate = () => {
    const newErrors = {};

    // 이메일 형식 검사
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }

    // 비밀번호 검사: 최소 8자 이상, 숫자와 특수 문자 포함
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(formData.password)) {
      newErrors.password = '비밀번호는 최소 8자 이상, 숫자와 특수 문자를 포함해야 합니다.';
    }

    // 비밀번호 확인
    if (formData.password !== formData.password2) {
      newErrors.password2 = '비밀번호가 일치하지 않습니다.';
    }

    // 핸드폰 번호 형식 검사
    if (!/^010-\d{4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '핸드폰 번호는 010-XXXX-XXXX 형식으로 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 회원가입 요청 핸들러
  const handleSignup = async () => {
    if (!validate()) return; // 유효성 검사가 실패하면 중단
    const { name, email, password, phone } = formData;

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
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="form-field"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-field"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-field"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}

          <input
            type="password"
            name="password2"
            placeholder="Re-enter Password"
            className="form-field"
            value={formData.password2}
            onChange={handleChange}
          />
          {errors.password2 && <div className="error">{errors.password2}</div>}

          <input
            type="text"
            name="phone"
            placeholder="Mobile number"
            className="form-field"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="error">{errors.phone}</div>}

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
