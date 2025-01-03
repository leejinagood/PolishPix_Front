import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// 이미지
import LogoImage from './image/PolishPix3.png';
import IconPicture from './image/picture.png';
import IconMarker from './image/marker.png';
import IconSearch from './image/search.png';
import IconUser from './image/user.png';

// 컴포넌트
import MarkerComponent from './component/marker';
import SearchComponent from './component/search';
import UserComponent from './component/user';
import LoginComponent from './component/login';
import SignupComponent from './component/signup';
import PictureComponent from './component/picture';
import BoardComponent from './component/board'; 
import ProfileComponent from './component/profile'; 

import './App.css';

function App() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [content, setContent] = useState('Picture'); // 상태 초기화

  // 메뉴 버튼 클릭 이벤트
  const menuClickButton = (e) => {
    const name = e.currentTarget.getAttribute('name'); // currentTarget에서 name 가져오기
    if (name) {
      setContent(name);
      navigate(`/${name.toLowerCase()}`);
    }
  };

  const logoClickHandler = () => {
    setContent('Picture'); // 상태 초기화
    navigate("/"); // 네비게이션
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="fixed-header"> {/* 고정 헤더 */}
          <img src={LogoImage} className="logo_img" alt="logo" onClick={logoClickHandler}/>
          <table className='menu-table'>
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <button className="menu-button" onClick={menuClickButton} name='Picture'>
                    <img src={IconPicture} className="icon" />
                  </button>
                </td>
                <td>
                  <button className="menu-button" onClick={menuClickButton} name='Marker'>
                    <img src={IconMarker} className="icon" />
                  </button>
                </td>
                <td>
                  <button className="menu-button" onClick={menuClickButton} name='Search'>
                    <img src={IconSearch} className="icon" />
                  </button>
                </td>
                <td>
                  <button className="menu-button" onClick={menuClickButton} name='Profile'>
                    <img src={IconUser} className="icon" />
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
          <br />
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br />

        {/* Routes 설정 */}
        <Routes>
          <Route path="/" element={<PictureComponent />} />
          <Route path="/marker" element={<MarkerComponent />} />
          <Route path="/search" element={<SearchComponent />} />
          <Route path="/user" element={<UserComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/picture" element={<PictureComponent />} />
          <Route path="/board" element={<BoardComponent />} />
          <Route path="/profile" element={<ProfileComponent />} />
        </Routes>
      </header>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
